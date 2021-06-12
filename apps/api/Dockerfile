FROM node:lts-alpine
WORKDIR /app
COPY ./dist/apps/api .
ENV PORT=3333
EXPOSE ${PORT}
RUN yarn --production
# dependencies that nestjs needs
# RUN npm install reflect-metadata tslib rxjs @nestjs/platform-express
CMD node ./main.js