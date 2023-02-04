const path = require("path");
require("dotenv").config();
const axios = require("axios");

import { sendEmail } from "./services/nodemailer";


const { getToReadShelf } = require("./services/puppeteer");
const { writeDataToFiles } = require("./helpers/helpers");
const { amazonOptions } = require("./constants/axios");

const { arrayMock } = require("./constants/mock");
const { Book } = require("./constants/types");

const server = async () => {
  try {
    const toReadData = await getToReadShelf();

    console.log(`Found ${toReadData.length} entries`);

    writeDataToFiles(toReadData);

    const promises = [] as any;
    const amazonBooksPerPage = [] as any;
    let amazonBooks = [] as any;

    // Basic plan of the API used only allows 2 requests per second so increasing the time
    for (let i = 1; i < 20; i++) {
      const delay = 3000 * i;
      amazonOptions.params.page = i;
      promises.push(new Promise(async function(resolve){
        await new Promise(res => setTimeout(res, delay));

        let result = await axios.request(amazonOptions);
        resolve(result as any);
      }))
      promises.push(axios.request(amazonOptions));
    }

    const a = await Promise.all(promises).then((response): [any] => {
      for (let i = 0; i < response.length; i++) {
        amazonBooks = amazonBooksPerPage.concat(
          response[i].data.searchProductDetails
        );
      }
      return amazonBooks;
    });

    console.log('a => ', a)
   
    const discountedBooks = [] as any;

    toReadData.forEach((book: typeof Book) => {
      const bookFound = a.find((element: any) => {
        //console.log(element.productDescription, book.title);
        return element.productDescription.includes(book.title);
      });
      if (bookFound) {
        console.log(`Found book: `, bookFound);
        discountedBooks.push(bookFound);
      }
    });

    console.log(`Found a total of ${discountedBooks.length} discounted books`);

    const booksToBuy = discountedBooks.filter((book: any) => {
      console.log("book", book, book.variations[0])
       if( book.variations[0].value == "Kindle Edition" &&
        book.variations[0].price < 1.00) {
          const newUrl = `https://www.amazon.co.uk${book.dpUrl}`
          book.dpUrl = newUrl
          return book
        }
    
  });
  await sendEmail(booksToBuy)
    console.log("Books to buy: ", booksToBuy);
  } catch (error) {
    console.log("Server error: ", error);
    throw Error(error as any);
  }
};

server();
