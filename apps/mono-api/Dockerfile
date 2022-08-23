FROM node:slim as base
WORKDIR /app
ENV PORT=3333
EXPOSE ${PORT}

COPY libs/mono/prisma/schema.prisma ./schema.prisma
COPY libs/mono/prisma/migrations ./migrations
COPY libs/mono/prisma/schema.prisma ./schema.prisma
COPY apps/mono-api/schema.gql ./schema.gql

FROM base as dependencies
RUN yarn --production

FROM dependencies as prisma
RUN npx prisma generate

FROM prisma as release

CMD node ./main.js