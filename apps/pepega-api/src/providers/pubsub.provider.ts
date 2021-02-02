import { RedisPubSub } from 'graphql-redis-subscriptions';
import * as Redis from 'ioredis';
import { ConfigService } from '@nestjs/config';
import { PUB_SUB } from '../constants';

export const pubSubFactory = {
  provide: PUB_SUB,
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const redisConfig = {
      port: configService.get('db.redisPort'),
      host: configService.get('db.redisHost'),
      keyPrefix: configService.get('base.appPrefix')
    };

    return new RedisPubSub({
      publisher: new Redis(redisConfig),
      subscriber: new Redis(redisConfig)
    });
  }
};
