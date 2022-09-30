"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getToReadShelf = void 0;
const puppeteer_1 = require("puppeteer");
if (!process.env.GOODREADS_USER) {
    throw new Error("Environment variable GOODREADS_USER is missing.");
}
//Promise<Book[]>
const getToReadShelf = async () => {
    try {
        const browser = await puppeteer_1.default.launch({ headless: false });
        const page = await browser.newPage();
        await page.setViewport({ width: 1366, height: 768 });
        await page.goto(`https://www.goodreads.com/review/list/${process.env.GOODREADS_USER}?shelf=to-read`);
    }
    catch (error) {
        console.log("Puppeteer error: ", error);
    }
};
exports.getToReadShelf = getToReadShelf;
//# sourceMappingURL=puppeteer.js.map