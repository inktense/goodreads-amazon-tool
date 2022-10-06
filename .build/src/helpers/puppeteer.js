"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.autoScroll = void 0;
// Function that scrolls on a pageuntil it reaches the end
const autoScroll = async (page) => {
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            let totalHeight = 0;
            const distance = 100;
            const timer = setInterval(() => {
                const scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;
                if (totalHeight >= scrollHeight) {
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
};
exports.autoScroll = autoScroll;
//# sourceMappingURL=puppeteer.js.map