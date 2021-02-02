FROM node:12-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ADD . .

RUN yarn
RUN yarn build

EXPOSE 3000
CMD ["yarn", "start:prod"]