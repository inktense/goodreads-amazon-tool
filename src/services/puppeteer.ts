// import * as chromium from "chrome-aws-lambda";
const chromium = require('chrome-aws-lambda');
import * as puppeteer from 'puppeteer-core'
//const puppeteer = require("puppeteer-core");


import { URL } from "../constants/goodreads";
import { autoScroll } from "../helpers/puppeteer";
import { Book } from "../constants/types";

export const getToReadShelf = async (): Promise<Book[]> => {
  try {
    // const executablePath = process.env.IS_OFFLINE ? null : 
    // const browser = await puppeteer.launch({ headless: false });
    const browser = await chromium.puppeteer.launch({
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath,
            headless: chromium.headless,
            ignoreHTTPSErrors: true,
        });
    const page = await browser.newPage();
    await page.setViewport({
      width: 1280,
      height: 800,
      deviceScaleFactor: 1,
    });

    await page.goto(URL, { waitUntil: "networkidle2" });
    await page.waitForTimeout(5000);

    // Scroll to the bottom of the page to make sure we get all the books
    await autoScroll(page);

    // Waiting to make sure we manage to scroll to the bottom,
    // otherwise we will miss the last books
    await page.waitForTimeout(10000);

    const titlesArray: string[] = await page.evaluate(() => {
      const titles = Array.from(document.getElementsByClassName("field title"));
      return titles.map((title) => (title as HTMLElement).innerText);
    });

    const authorsArray: string[] = await page.evaluate(() => {
      const authors = Array.from(
        document.getElementsByClassName("field author")
      );
      return authors.map((author) => (author as HTMLElement).innerText);
    });
    console.table(titlesArray);

    await browser.close()

    const toReadBooksArray = titlesArray.map((element, i) => {
      return {
        title: element,
        author: authorsArray[i],
      } as Book;
    });

    return toReadBooksArray;

  } catch (error) {
    console.log("Puppeteer error: ", error);
  }
};
