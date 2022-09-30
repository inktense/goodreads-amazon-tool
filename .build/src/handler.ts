import { Handler } from "aws-lambda";

import { getToReadShelf } from './services/puppeteer'

export const handler: Handler = async (): Promise<void> => {
  console.log("Hello AWS");

  getToReadShelf()
};
