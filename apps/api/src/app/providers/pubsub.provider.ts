import { RedisPubSub } from 'graphql-redis-subscriptions';
import { ConfigService } from '@nestjs/config';
import * as Redis from 'ioredis';

export const pubSubFactory = {
  provide: 'PUB_SUB',
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    return new RedisPubSub({
      publisher: new Redis(configService.get('db.redisUrl')),
      subscriber: new Redis(configService.get('db.redisUrl')),
    });
  },
};
