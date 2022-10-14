# goodreads-amazon-tool
Script used to search Amazon Kindle book deals for books marked as "Want to read" in Goodreads. 

Manually created AWS Bucket 

AWS_PROFILE=PROFILE sls deploy


work locally:

sls offline

change terminal

aws lambda invoke /local \
  --endpoint-url http://localhost:3002 \
  --function-name goodreads-amazon-shelf-cron-function


  Potential error after deploying Lambda function:

  Puppeteer error:  Error: Could not find expected browser (chrome) locally. Run `npm install` to download the correct Chromium revision (1045629).


journey to building a Puppeteer scraper on Lambda.

Approach one quickly fell apart after noticing 
