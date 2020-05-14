FROM node:alpine
WORKDIR /usr/src/app
# Installing dependencies
COPY package*.json ./
RUN yarn
# Copying source files
COPY . .
# Building app
RUN yarn build
# Running the app
CMD [ "yarn", "start" ]
EXPOSE 5000