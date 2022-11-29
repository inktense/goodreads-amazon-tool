const path = require("path");
require("dotenv").config();
const axios = require("axios");

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

    // const promises = [];
    // const amazonBooksPerPage = [] as any;
    // let amazonBooks = [] as any;

    // for (let i = 1; i < 3; i++) {
    //   amazonOptions.params.page = i;
    //   promises.push(axios.request(amazonOptions));
    // }

    // await Promise.all(promises).then((response): [any] => {
    //   for (let i = 0; i < response.length; i++) {
    //     amazonBooks = amazonBooksPerPage.concat(
    //       response[i].data.searchProductDetails
    //     );
    //   }
    //   return amazonBooks;
    // });

    //console.log(arrayMock)
    toReadData.push({
      title: "The Grave Tattoo",
      author: "author",
    },
    {
      title: "Women with Adult ADHD",
      author: "author",
    });
    const discountedBooks = [] as any;

    toReadData.forEach((book: typeof Book) => {
      const bookFound = arrayMock.find((element: any) => {
        //console.log(element.productDescription, book.title);
        return element.productDescription.includes(book.title);
      });
      if (bookFound) {
        console.log("Found book: ", bookFound);
        discountedBooks.push(bookFound);
      }
    });

    console.log("Found ", discountedBooks.length, " discounted books", discountedBooks);

    const booksToBuy = discountedBooks.filter((book: any) => {
      console.log(book.variations[0].value, book.variations.length, typeof book.variations)
       return book.variations[0].value == "Kindle Edition" &&
        book.variations[0].price < 1.00
    
  });

    console.log("Books to buy: ", booksToBuy);
  } catch (error) {
    console.log("Server error: ", error);
    throw Error(error as any);
  }
};

server();
