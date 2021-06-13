FROM node:lts-alpine as base
WORKDIR /app
RUN ls
COPY dist/apps/api .

FROM base as dependencies
RUN yarn --production
RUN yarn generate

FROM dependencies as release
ENV PORT=3333
EXPOSE ${PORT}

CMD node ./main.js