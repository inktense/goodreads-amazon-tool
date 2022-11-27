const path = require("path");
require("dotenv").config();
const axios = require("axios");

const { getToReadShelf } = require("./services/puppeteer");
const { writeDataToFiles } = require("./helpers/helpers");
const { amazonOptions } = require("./constants/axios");

const server = async () => {
  try {
    const toReadData = await getToReadShelf();

    console.log(`Found ${toReadData.length} entries`);

    writeDataToFiles(toReadData);

    const promises = [];
    const amazonBooks = [] as any;
    let array1 = [] as any

    for(let i = 1; i < 3; i++) {
   //   console.log('amazonOptions', amazonOptions);
      amazonOptions.params.page = i;
      promises.push(axios.request(amazonOptions));
    }
console.log(promises)
    await Promise.all(promises).then((response): [any] => {
      
      for(let i = 0; i < response.length; i++) {
       // console.log('array 1', array1);
       // console.log("here ", response[i].data.searchProductDetails);
        array1 = amazonBooks.concat(response[i].data.searchProductDetails);
      }
      //console.log('array 2', array1.length, array1);
      return array1;
      
    })
    // console.log('a', a);
    console.log('array 3', array1);
    } catch (error) {
      console.log("Server error: ", error);
      throw Error(error as any);
    };

   


    // axios
    //   .request(amazonOptions)
    //   .then(function (response: any) {
    //     console.log(response.data);
    //   })
    //   .catch(function (error: any) {
    //     console.error(error);
    //   });
  // } catch (error) {
  //   console.error(`Error`);
  //   throw Error(error as any);
  // }
};

server();
