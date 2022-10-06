import { Handler } from "aws-lambda";
import * as fs from 'fs';

import { getToReadShelf } from './services/puppeteer'

export const handler: Handler = async (): Promise<void> => {
  console.log("Hello AWS");

  const toReadData = await getToReadShelf()

  fs.writeFile("/data/books.json", JSON.stringify(toReadData, null, 2), function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
}); 
};
