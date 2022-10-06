import { Handler } from "aws-lambda";
import { writeFile } from 'fs';
import * as path from 'path'

import { getToReadShelf } from './services/puppeteer'

export const handler: Handler = async (): Promise<void> => {
  console.log("Hello AWS");

  const toReadData = await getToReadShelf()

  writeFile(path.resolve("src/data", "books.json"), JSON.stringify(toReadData, null, 2), function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
}); 
};
