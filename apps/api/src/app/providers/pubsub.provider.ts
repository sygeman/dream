import { RedisPubSub } from 'graphql-redis-subscriptions';
import * as Redis from 'ioredis';
import { ConfigService } from '@nestjs/config';

export const pubSubFactory = {
  provide: 'PUB_SUB',
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    return new RedisPubSub({
      publisher: new Redis(configService.get('db.redisUrl'), {
        keyPrefix: configService.get('base.appPrefix'),
      }),
      subscriber: new Redis(configService.get('db.redisUrl'), {
        keyPrefix: configService.get('base.appPrefix'),
      }),
    });
  },
};
