FROM public.ecr.aws/lambda/nodejs:14

RUN npm install chrome-aws-lambda@8.0.2 puppeteer-core@8.0.0 dotenv@16.0.3
RUN ls
COPY src/  ${LAMBDA_TASK_ROOT}
COPY .env  ${LAMBDA_TASK_ROOT}

CMD [ "index.handler" ]
