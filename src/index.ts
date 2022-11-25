const path = require("path");
require("dotenv").config();
const axios = require("axios");

const { getToReadShelf } = require("./services/puppeteer");
const { writeDataToFiles } = require("./helpers/helpers");

const server = async () => {
  try {
    const toReadData = await getToReadShelf();

    console.log(`Found ${toReadData.length} entries`)

    writeDataToFiles(toReadData);


const options = {
  method: 'GET',
  url: 'https://axesso-axesso-amazon-data-service-v1.p.rapidapi.com/amz/amazon-search-by-keyword-asin',
  params: {
    domainCode: 'co.uk',
    keyword: 'Jeans',
    page: '1',
    excludeSponsored: 'false',
    sortBy: 'relevanceblender',
    withCache: 'true'
  },
  headers: {
   
  }
};

axios.request(options).then(function (response: any) {
	console.log(response.data);
}).catch(function (error: any) {
	console.error(error);
});

     
  } catch (err) {
    console.error(`Error`);
    throw Error(err as any);
  }
};

server();