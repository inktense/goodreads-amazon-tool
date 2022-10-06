"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getToReadShelf = void 0;
const puppeteer = require("puppeteer");
const goodreads_1 = require("../constants/goodreads");
const puppeteer_1 = require("../helpers/puppeteer");
const getToReadShelf = async () => {
    try {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.setViewport({
            width: 1280,
            height: 800,
            deviceScaleFactor: 1,
        });
        await page.goto(goodreads_1.URL, { waitUntil: "networkidle2" });
        await page.waitForTimeout(5000);
        // Scroll to the bottom of the page to make sure we get all the books
        await (0, puppeteer_1.autoScroll)(page);
        // Waiting to make sure we manage to scroll to the bottom,
        // otherwise we will miss the last books
        await page.waitForTimeout(10000);
        const titlesArray = await page.evaluate(() => {
            const titles = Array.from(document.getElementsByClassName("field title"));
            return titles.map((title) => title.innerText);
        });
        const authorsArray = await page.evaluate(() => {
            const authors = Array.from(document.getElementsByClassName("field author"));
            return authors.map((author) => author.innerText);
        });
        console.table(titlesArray);
        const toReadBooksArray = titlesArray.map((element, i) => {
            return {
                title: element,
                author: authorsArray[i],
            };
        });
        return toReadBooksArray;
    }
    catch (error) {
        console.log("Puppeteer error: ", error);
    }
};
exports.getToReadShelf = getToReadShelf;
//# sourceMappingURL=puppeteer.js.map