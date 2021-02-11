import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: '*',
    },
  });

  // const config = app.get('ConfigService');

  // const RedisStore = connectRedis(session);

  // app.use(
  //   session({
  //     store: new RedisStore({
  //       client: new Redis(config.get('db.redisUrl'), {
  //         keyPrefix: config.get('base.appPrefix'),
  //       }),
  //     }),
  //     secret: config.get('auth.sessionSecret'),
  //     name: 'appsessions',
  //     resave: false,
  //     saveUninitialized: false,
  //   }),
  // );

  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
    })
  );

  await app.startAllMicroservicesAsync();
  await app.listen(3333);
}

bootstrap();
