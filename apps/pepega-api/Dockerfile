FROM node:lts-alpine as base
WORKDIR /app

COPY dist/apps/pepega-api .
COPY libs/pepega/prisma/migrations ./migrations
COPY libs/pepega/prisma/schema.prisma ./schema.prisma
COPY apps/pepega-api/schema.gql ./schema.gql

FROM base as dependencies
RUN yarn --production
RUN yarn add apollo-server-express

FROM dependencies as prisma
RUN yarn add prisma --dev
RUN yarn prisma generate

FROM prisma as release
ENV PORT=3333
EXPOSE ${PORT}

CMD node ./main.js