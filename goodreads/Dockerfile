FROM amazon/aws-lambda-nodejs:14

# Created new working directory
WORKDIR /app

COPY ./package.json ./package-lock.json ./

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Installs npm dependencies on container
RUN npm install --only=prod

# Copying the entire app after running yarn in order to support
# Docker caching of dependencies. This way when we make a change to the image
# rather then yarn reinstalling all dependencies all the time, it only reinstalls if there
# was a change in the package.json.
COPY . .
# COPY . ${LAMBDA_TASK_ROOT}

# Run typescrypt build command
RUN npm run build

# Move into the newly created folder
WORKDIR ./dist

# Command container will actually run when called
CMD node index

# CMD [ "./src/lambdas/crawlToReadShelf.handler" ]
