import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import RedisStore from 'connect-redis';
import Redis from 'ioredis';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: '*',
    },
  });

  const config = app.get(ConfigService);

  app.use(
    session({
      store: new RedisStore({
        client: new Redis(config.get('db.redisUrl')),
      }),
      secret: config.get('auth.sessionSecret'),
      name: 'appsessions',
      resave: false,
      saveUninitialized: false,
    }),
  );

  await app.startAllMicroservices();
  await app.listen(3333);
}

bootstrap();
