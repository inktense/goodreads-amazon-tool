const { URL } = require("../constants/goodreads");
const { autoScroll } = require("../helpers/puppeteer");

async function launchBrowser() {
  const chromium = require("chrome-aws-lambda");
  console.info("launching chrome-aws-lambda browser");
  const browser = await chromium.puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: chromium.headless,
    ignoreHTTPSErrors: true,
  });
  return browser;
}

async function getToReadShelf() {
  console.log("Starting Puppeteer");

  const browser = await launchBrowser();

  const page = await browser.newPage();

  console.log("browser => ", browser);

  //   try {
  //     await page.setViewport({
  //       width: 1280,
  //       height: 800,
  //       deviceScaleFactor: 1,
  //     });

  //     await page.goto(URL, { waitUntil: "networkidle2" });
  //     await page.waitForTimeout(5000);

  //     // Scroll to the bottom of the page to make sure we get all the books
  //     await autoScroll(page);

  //     // Waiting to make sure we manage to scroll to the bottom,
  //     // otherwise we will miss the last books
  //     await page.waitForTimeout(10000);

  //     const titlesArray = await page.evaluate(() => {
  //       const titles = Array.from(document.getElementsByClassName("field title"));
  //       return titles.map((title) => title.innerText);
  //     });

  //     const authorsArray = await page.evaluate(() => {
  //       const authors = Array.from(
  //         document.getElementsByClassName("field author")
  //       );
  //       return authors.map((author) => author.innerText);
  //     });
  //     console.table(titlesArray);

  //     await browser.close();

  //     const toReadBooksArray = titlesArray.map((element, i) => {
  //       return {
  //         title: element,
  //         author: authorsArray[i],
  //       };
  //     });

  //     return toReadBooksArray;
  //   } catch (error) {
  //     console.log("Puppeteer error: ", JSON.stringify(error));
  //   }
};

module.exports.getToReadShelf = getToReadShelf;
