# goodreads-amazon-tool
Script used to search Amazon Kindle book deals for books marked as "Want to read" in Goodreads. 

Manually created AWS Bucket 

AWS_PROFILE=PROFILE sls deploy


work locally:

sls offline

change terminal

aws lambda invoke /local \
  --endpoint-url http://localhost:3002 \
  --function-name goodreads-amazon-cron-function
