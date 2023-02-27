import Redis from 'ioredis';
import { ConfigService } from '@nestjs/config';
import { RedisPubSub } from 'graphql-redis-subscriptions';

export const pubSubFactory = {
  provide: 'PUB_SUB',
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    return new RedisPubSub({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      publisher: new Redis(configService.get('db.redisUrl')),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      subscriber: new Redis(configService.get('db.redisUrl')),
    });
  },
};
