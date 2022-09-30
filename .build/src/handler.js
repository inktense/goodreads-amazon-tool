"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const puppeteer_1 = require("./services/puppeteer");
const handler = async () => {
    console.log("Hello AWS");
    (0, puppeteer_1.getToReadShelf)();
};
exports.handler = handler;
//# sourceMappingURL=handler.js.map