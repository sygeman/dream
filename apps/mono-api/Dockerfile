FROM node:lts-alpine as base
WORKDIR /app

COPY dist/apps/mono-api .
COPY libs/prisma/mono/migrations ./migrations
COPY libs/prisma/mono/schema.prisma ./schema.prisma
COPY apps/mono-api/schema.gql ./schema.gql

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