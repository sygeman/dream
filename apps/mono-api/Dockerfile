FROM node:lts-alpine as base
WORKDIR /app

COPY dist/apps/mono-api .
COPY libs/mono/prisma/migrations ./migrations
COPY libs/mono/prisma/schema.prisma ./schema.prisma
COPY apps/mono-api/schema.gql ./schema.gql

FROM base as dependencies
RUN yarn --production
ENV PRISMA_MONO_OUTPUT="./node_modules/@prisma/mono"
RUN npx prisma generate
RUN cp -R node_modules prod_node_modules

FROM base as release
COPY --from=dependencies /app/prod_node_modules ./node_modules
ENV PORT=3333
EXPOSE ${PORT}

CMD node ./main.js