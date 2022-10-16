# FROM amazon/aws-lambda-nodejs:14

# # Created new working directory
# WORKDIR /app

# COPY package.json package-lock.json ./

# ARG NODE_ENV=production
# ENV NODE_ENV=${NODE_ENV}

# # Installs npm dependencies on container
# RUN npm install --only=prod

# # Copying the entire app after running yarn in order to support
# # Docker caching of dependencies. This way when we make a change to the image
# # rather then yarn reinstalling all dependencies all the time, it only reinstalls if there
# # was a change in the package.json.
# COPY . .
# # COPY . ${LAMBDA_TASK_ROOT}

# # Run typescrypt build command
# RUN npm run build

# COPY . ${LAMBDA_TASK_ROOT}

# # Move into the newly created folder
# WORKDIR ./build

# # WORKDIR ${LAMBDA_TASK_ROOT}

# # COPY /app/build/* ./

# # Command container will actually run when called
# # CMD node crawlToReadShelf
# # ENTRYPOINT ["/lambda-entrypoint.sh", "index.handler"]
# CMD [ "index.handler" ]


# FROM public.ecr.aws/lambda/nodejs:14 as builder
# WORKDIR /usr/app
# COPY package.json index.ts  ./
# COPY . .

# # ARG NODE_ENV=production
# # ENV NODE_ENV=${NODE_ENV}

# # Installs npm dependencies on container
# RUN npm install --omit=dev
# RUN npm run build
    

# FROM public.ecr.aws/lambda/nodejs:14
# WORKDIR ${LAMBDA_TASK_ROOT}
# COPY --from=builder /usr/app/.webpack/* ./

# ENV GOODREADS_USER=97751742-bianca

# COPY package.json  ${LAMBDA_TASK_ROOT}

# RUN npm install --omit=dev
# RUN npm install puppeteer-core


# CMD ["index.handler"]


FROM amazon/aws-lambda-nodejs:14

COPY index.js ./package.json ./package-lock.json ./

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

RUN npm install --only=prod

COPY . .

# COPY . ${LAMBDA_TASK_ROOT}

CMD [ "index.handler" ]
