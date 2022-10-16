const fs = require("fs")
const path = require("path")
require("dotenv").config();

// import { getToReadShelf } from "./src/services/puppeteer";
const { getToReadShelf } = require("./src/services/puppeteer");

export const handler = async () => {
  console.log("Staring Goodreads To read shelf Lambda");

  try {
    const toReadData = await getToReadShelf();

    // writeFile(
    //   path.resolve("src/data", "books.json"),
    //   JSON.stringify(toReadData, null, 2),
    //   function (err) {
    //     if (err) {
    //       return console.log(err);
    //     }
    //   }
    // );

  //  console.log(`Found ${toReadData.length} entries`)

  } catch (err) {
    console.error(`Error`);
    throw Error(err);
  }
};

module.exports.handler = handler;
