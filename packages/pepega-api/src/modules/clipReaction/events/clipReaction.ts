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
import { ClipReaction } from '../clipReaction.entity';
import { ClipReactionService } from '../clipReaction.service';

@Injectable()
export class ClipReactionSubscriber
  implements EntitySubscriberInterface<ClipReaction> {
  constructor(
    @InjectConnection() readonly connection: Connection,
    @Inject(PUB_SUB) private readonly pubsub: RedisPubSub,
    private readonly clipReactionService: ClipReactionService,
  ) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return ClipReaction;
  }

  recalcAndPublish(clipReaction: ClipReaction) {
    // TODO: without timeout
    setTimeout(() => {
      this.clipReactionService.recalcStats(clipReaction.clipId);
    }, 200);

    this.pubsub.publish('clipReaction', { clipReaction });
  }

  afterInsert(event: InsertEvent<ClipReaction>) {
    this.recalcAndPublish(event.entity);
  }

  afterUpdate(event: UpdateEvent<ClipReaction>) {
    this.recalcAndPublish(event.entity);
  }
}
