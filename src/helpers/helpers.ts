const fs = require("fs");
import { Book } from "../constants/types";

export const writeDataToFiles = (data: Book[]) => {
    fs.writeFile(
        path.resolve("src/data", "books.json"),
        JSON.stringify(data, null, 2),
        function (err: any) {
          if (err) {
            return console.log(err);
          }
        }
      );
}