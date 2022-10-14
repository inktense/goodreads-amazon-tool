import { Handler } from "aws-lambda";
import { writeFile } from "fs";
import * as path from "path";
import * as dotenv from 'dotenv'

import { getToReadShelf } from "../services/puppeteer";

export const handler: Handler = async (): Promise<void> => {
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
    throw Error(err as string);
  }
};
