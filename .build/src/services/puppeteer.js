"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getToReadShelf = void 0;
const puppeteer_1 = require("puppeteer");
const goodreads_1 = require("../constants/goodreads");
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
        // await sleep_for(page, 1000, 2000)
        const books = await page.$x(`//div[@class="myBooksPage"]/div[2]/div[2]/table/tbody`);
        let lines = [];
        const rawData = await page.evaluate(() => {
            let data = [];
            let table = document.getElementById("booksBody");
            for (var i = 1; i < table.rows.length; i++) {
                let objCells = table.rows.item(i).cells;
                let values = [];
                for (var j = 0; j < objCells.length; j++) {
                    let text = objCells.item(j).innerHTML;
                    values.push(text);
                }
                let d = { i, values };
                data.push(d);
            }
            return data;
        });
        console.log(rawData);
        //     const scrapedData = await page.evaluate(() =>
        //     Array.from(document.querySelectorAll('h4 a'))
        //       .map(link => ({
        //         title: link.innerHTML,
        //         link: link.getAttribute('href')
        //       }))
        //   )
        // if (books.length > 0) {
        //     for (let i = 0; i <= books.length; i ++) {
        //         let title = await page.evaluate(el => el.innerText, books[i]);
        //         title = title.replace(/(\r\n|\n\r)/gm, ' ')
        //         console.log("Here title => ", title)
        //         lines.push(title)
        //     }
        // }
        console.table(lines);
    }
    catch (error) {
        console.log("Puppeteer error: ", error);
    }
};
exports.getToReadShelf = getToReadShelf;
//# sourceMappingURL=puppeteer.js.map