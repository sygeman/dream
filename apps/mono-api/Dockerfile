FROM node:slim as base
WORKDIR /app
ENV PORT=3333
EXPOSE ${PORT}

COPY dist/apps/mono-api/standalone .
# COPY libs/mono/prisma/migrations ./migrations
# COPY libs/mono/prisma/schema.prisma ./schema.prisma
# COPY apps/mono-api/schema.gql ./schema.gql

# FROM base as dependencies
# RUN yarn --production

# FROM dependencies as prisma
# RUN yarn add prisma --dev
# depended on build platform
# RUN yarn prisma generate

# FROM prisma as release


CMD node ./index.js