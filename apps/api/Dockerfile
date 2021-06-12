FROM node:lts-alpine
WORKDIR /app
RUN ls
COPY dist/apps/api .
ENV PORT=3333
EXPOSE ${PORT}
RUN yarn --production
# dependencies that nestjs needs
# RUN npm install reflect-metadata tslib rxjs @nestjs/platform-express
CMD node ./main.js