FROM node:lts-alpine as base
WORKDIR /app

COPY dist/apps/pepega-api .
COPY prisma ./prisma

FROM base as dependencies
RUN yarn --production
# RUN yarn add apollo-server-express

FROM dependencies as prisma
RUN yarn add prisma --dev
RUN yarn prisma generate

FROM prisma as release
ENV PORT=3333
EXPOSE ${PORT}

CMD node ./index.js