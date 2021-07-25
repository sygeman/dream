FROM node:lts-alpine as base
WORKDIR /app
RUN ls
COPY dist/apps/api .
COPY prisma ./prisma

FROM base as dependencies
RUN yarn --production
RUN yarn add apollo-server-express@2.25.2

FROM dependencies as prisma
RUN yarn add prisma --dev
RUN yarn prisma generate

FROM prisma as release
ENV PORT=3333
EXPOSE ${PORT}

CMD node ./main.js