import puppeteer from 'puppeteer'

if (!process.env.GOODREADS_USER) {
    throw new Error("Environment variable GOODREADS_USER is missing.")
  }

type Book = {
    title: String,
    author: string
}
//Promise<Book[]>
export const getToReadShelf = async () => {
    try { 
        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();
        await page.setViewport({ width: 1366, height: 768});
        await page.goto(`https://www.goodreads.com/review/list/${process.env.GOODREADS_USER}?shelf=to-read`);

    } catch (error) {
        console.log("Puppeteer error: ", error)
    }
}
