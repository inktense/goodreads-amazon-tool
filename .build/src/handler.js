"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const fs_1 = require("fs");
const path = require("path");
const puppeteer_1 = require("./services/puppeteer");
const handler = async () => {
    console.log("Hello AWS");
    const toReadData = await (0, puppeteer_1.getToReadShelf)();
    (0, fs_1.writeFile)(path.resolve("src/data", "books.json"), JSON.stringify(toReadData, null, 2), function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
};
exports.handler = handler;
//# sourceMappingURL=handler.js.map