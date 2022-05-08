import { Injectable, Inject } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import {
  Connection,
  EntitySubscriberInterface,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { PUB_SUB } from '../../../constants';
import { ClipReactionStats } from '../clipReactionStats.entity';

@Injectable()
export class ClipReactionsSubscriber
  implements EntitySubscriberInterface<ClipReactionStats> {
  constructor(
    @InjectConnection() readonly connection: Connection,
    @Inject(PUB_SUB) private readonly pubsub: RedisPubSub,
  ) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return ClipReactionStats;
  }

  publish(clipReactionStats) {
    this.pubsub.publish('clipReactionStats', { clipReactionStats });
  }

  afterInsert(event: InsertEvent<ClipReactionStats>) {
    this.publish(event.entity);
  }

  afterUpdate(event: UpdateEvent<ClipReactionStats>) {
    this.publish(event.entity);
  }
}
