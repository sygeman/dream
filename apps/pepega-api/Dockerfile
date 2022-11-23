FROM node:lts-alpine as base
WORKDIR /app

COPY dist/apps/pepega-api .
COPY libs/pepega/prisma/migrations ./migrations
COPY libs/pepega/prisma/schema.prisma ./schema.prisma
COPY apps/pepega-api/schema.gql ./schema.gql

FROM base as dependencies
RUN yarn --production
RUN npx prisma generate
RUN cp -R node_modules prod_node_modules

FROM base as release
COPY --from=dependencies /prod_node_modules /node_modules
ENV PORT=3333
EXPOSE ${PORT}

CMD node ./main.js