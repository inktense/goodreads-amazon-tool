import { Handler } from "aws-lambda";

export const handler: Handler = async (): Promise<void> => {
  console.log("Hello AWS");
};
