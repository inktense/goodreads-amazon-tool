if (!process.env.X_RAPIDAPI_KEY) {
  throw new Error("Environment variable X_RAPIDAPI_KEY is missing.");
}

if (!process.env.X_RAPIDAPI_HOST) {
  throw new Error("Environment variable X_RAPIDAPI_HOST is missing.");
}

export const amazonOptions = {
  method: "GET",
  url: "https://axesso-axesso-amazon-data-service-v1.p.rapidapi.com/amz/amazon-search-by-keyword-asin",
  params: {
    domainCode: "co.uk",
    keyword: 'kindle book deals',
    page: "1",
    excludeSponsored: "true",
    category: "digital-text",
  },
  headers: {
    "X-RapidAPI-Key": process.env.X_RAPIDAPI_KEY,
    "X-RapidAPI-Host": process.env.X_RAPIDAPI_HOST,
  },
};
