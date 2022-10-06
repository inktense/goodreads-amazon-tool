"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.URL = void 0;
if (!process.env.GOODREADS_USER) {
    throw new Error("Environment variable GOODREADS_USER is missing.");
}
exports.URL = `https://www.goodreads.com/review/list/${process.env.GOODREADS_USER}?shelf=to-read`;
//# sourceMappingURL=goodreads.js.map