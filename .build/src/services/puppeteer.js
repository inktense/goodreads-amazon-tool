"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getToReadShelf = void 0;
const puppeteer_1 = require("puppeteer");
const goodreads_1 = require("../constants/goodreads");
const puppeteer_2 = require("../helpers/puppeteer");
//Promise<Book[]>
const getToReadShelf = async () => {
    try {
        const browser = await puppeteer_1.default.launch({ headless: false });
        const page = await browser.newPage();
        await page.setViewport({
            width: 1280,
            height: 800,
            deviceScaleFactor: 1,
        });
        await page.goto(goodreads_1.URL, { waitUntil: "networkidle2" });
        await page.waitForTimeout(5000);
        // Scroll to the bottom of the page to make sure we get all the books
        await (0, puppeteer_2.autoScroll)(page);
        // Waiting to make sure we manage to scroll to the bottom,
        // otherwise we will miss the last books
        await page.waitForTimeout(10000);
        // await sleep_for(page, 1000, 2000)
        // const books = await page.$x(
        //   `//div[@class="myBooksPage"]/div[2]/div[2]/table/tbody`
        // );
        // let lines: string[] = [];
        const titlesArray = await page.evaluate(() => {
            // const tds = Array.from(document.querySelectorAll(' tr td'))
            const titles = Array.from(document.getElementsByClassName("field title"));
            // const authors = Array.from(document.getElementsByClassName('field author'))
            return titles.map((title) => title.innerText);
        });
        const authorsArray = await page.evaluate(() => {
            const authors = Array.from(document.getElementsByClassName("field author"));
            return authors.map((author) => author.innerText);
        });
        console.table(titlesArray);
        console.table(authorsArray);
    }
    catch (error) {
        console.log("Puppeteer error: ", error);
    }
};
exports.getToReadShelf = getToReadShelf;
//# sourceMappingURL=puppeteer.js.map