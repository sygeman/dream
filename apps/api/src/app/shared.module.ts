import { Module, Global } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ConfigService } from '@nestjs/config';
import { pubSubFactory } from './providers/pubsub.provider';

const QueueModule = BullModule.registerQueueAsync({
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const redisConfig = {
      port: configService.get('db.redisPort'),
      host: configService.get('db.redisHost'),
      keyPrefix: configService.get('base.appPrefix'),
    };

    return {
      defaultJobOptions: {
        removeOnComplete: true,
      },
      prefix: `${configService.get('base.appPrefix')}bull`,
      redis: redisConfig,
    };
  },
});

@Global()
@Module({
  imports: [QueueModule],
  providers: [pubSubFactory],
  exports: [pubSubFactory, QueueModule],
})
export class SharedModule {}
