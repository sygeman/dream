FROM node:lts-alpine as base
WORKDIR /app
RUN ls
COPY dist/apps/api .
COPY prisma .

FROM base as dependencies
RUN yarn --production
COPY node_modules/.prisma/client/ ./node_modules/.prisma/client/

FROM dependencies as release
ENV PORT=3333
EXPOSE ${PORT}

CMD node ./main.js