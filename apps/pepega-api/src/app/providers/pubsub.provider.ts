import { RedisPubSub } from 'graphql-redis-subscriptions';
import { ConfigService } from '@nestjs/config';

export const pubSubFactory = {
  provide: 'PUB_SUB',
  inject: [ConfigService],
  useFactory: (configService: ConfigService) =>
    new RedisPubSub({
      connection: {
        port: configService.get('db.redisPort'),
        host: configService.get('db.redisHost'),
        retryStrategy: (times) => {
          return Math.min(times * 50, 2000);
        },
      },
    }),
};