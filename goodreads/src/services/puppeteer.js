// import * as chromium from "chrome-aws-lambda";
// const chromium = require("chrome-aws-lambda");
const puppeteer = require("puppeteer")

// const puppeteer = require('puppeteer-core');
// const AdblockerPlugin = require("puppeteer-extra-plugin-adblocker");

// const { addExtra } = require("puppeteer-extra");
//import * as AdblockerPlugin from 'puppeteer-extra-plugin-adblocker'
// import * as puppeteer from "puppeteer-core";
//const puppeteer = require("puppeteer-core");

const { URL } = require("../constants/goodreads");
const { autoScroll } = require("../helpers/puppeteer");

// const puppeteerExtra = addExtra(chromium.puppeteer);
// puppeteerExtra.use(AdblockerPlugin());

const getToReadShelf = async () => {
  console.log("URL => ", URL)
  // const executablePath = await chromium.executablePath;
	// console.log(`executable path: ${executablePath}`);

   // const executablePath = process.env.IS_OFFLINE ? null :
    const browser = await puppeteer.launch({ headless: false });
    // const browser = await puppeteerExtra.launch({
    //   args: chromium.args,
    //   defaultViewport: chromium.defaultViewport,
    //   executablePath:
    //   process.env.NODE_ENV !== 'production'
    //     ? undefined
    //     : await chromium.executablePath,
    //   headless: chromium.headless,
    //   ignoreHTTPSErrors: true
    // });
    const page = await browser.newPage();

    console.log("browser => ", browser)

  try {
  
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

    const titlesArray = await page.evaluate(() => {
      const titles = Array.from(document.getElementsByClassName("field title"));
      return titles.map((title) => title.innerText);
    });

    const authorsArray = await page.evaluate(() => {
      const authors = Array.from(
        document.getElementsByClassName("field author")
      );
      return authors.map((author) => author.innerText);
    });
    console.table(titlesArray);

    await browser.close();

    const toReadBooksArray = titlesArray.map((element, i) => {
      return {
        title: element,
        author: authorsArray[i],
      };
    });

    return toReadBooksArray;
  } catch (error) {
    console.log("Puppeteer error: ", JSON.stringify(error));
  }
};

module.exports.getToReadShelf = getToReadShelf;
