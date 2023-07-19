FROM node:lts-alpine as base
WORKDIR /app

COPY dist/apps/mono-api .
COPY prisma .
COPY schema.gql .

FROM base as dependencies
RUN npm ci
RUN npx prisma generate
RUN cp -R node_modules prod_node_modules

FROM base as release
COPY --from=dependencies /app/prod_node_modules ./node_modules
ENV PORT=3333
EXPOSE ${PORT}

CMD node ./main.js