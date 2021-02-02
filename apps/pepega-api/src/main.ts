import * as Redis from 'ioredis';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as connectRedis from 'connect-redis';
import { AppModule } from './app.module';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: '*',
    },
  });

  const config = app.get('ConfigService');

  app.use(cookieParser());

  const RedisStore = connectRedis(session);

  app.use(
    session({
      store: new RedisStore({
        client: new Redis(config.get('db.redisUrl'), {
          keyPrefix: config.get('base.appPrefix'),
        }),
      }),
      secret: config.get('auth.sessionSecret'),
      name: 'appsessions',
      resave: false,
      saveUninitialized: false,
    }),
  );

  await app.startAllMicroservicesAsync();
  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
