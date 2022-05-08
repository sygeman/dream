import { UseGuards, Inject } from '@nestjs/common';
import {
  Mutation,
  Query,
  Resolver,
  Subscription,
  Args,
  Context,
} from '@nestjs/graphql';
import { AuthGuard } from '../../guards';
import { ClipReactionService } from './clipReaction.service';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { PUB_SUB } from '../../constants';
import { ID } from 'type-graphql';
import { SetClipReactionArgs } from './dto/setClipReaction.args';
import { ClipReaction } from './models/clipReaction';
import { ClipReactionStats } from './models/clipReactionStats';

@Resolver(of => ClipReaction)
export class ClipReactionResolver {
  constructor(
    private readonly clipReactionService: ClipReactionService,
    @Inject(PUB_SUB) private readonly pubsub: RedisPubSub,
  ) {}

  @Query(returns => ClipReaction, { nullable: true })
  async clipReaction(
    @Args({ name: 'clipId', type: () => ID })
    clipId: string,
    @Context('userId') userId: string,
  ) {
    if (!userId) {
      return null;
    }

    return this.clipReactionService.get(clipId, userId);
  }

  @Query(returns => ClipReactionStats, { nullable: true })
  async clipReactionStats(
    @Args({ name: 'clipId', type: () => ID })
    clipId: string,
  ) {
    return this.clipReactionService.getStats(clipId);
  }

  @Mutation(returns => Boolean)
  @UseGuards(AuthGuard)
  async setClipReaction(
    @Args() args: SetClipReactionArgs,
    @Context('userId') userId: string,
  ) {
    await this.clipReactionService.set({
      clipId: args.clipId,
      userId: userId,
      type: args.type,
    });

    return true;
  }

  @Subscription(returns => ClipReaction, {
    name: 'clipReaction',
    filter: ({ clipReaction }, { clipId }, { userId }) =>
      userId &&
      userId === clipReaction.userId &&
      clipId === clipReaction.clipId,
  })
  clipReactionUpdated(
    @Args({ name: 'clipId', type: () => ID })
    clipId: string,
    @Context('userId') userId: string,
  ) {
    return this.pubsub.asyncIterator('clipReaction');
  }

  @Subscription(returns => ClipReactionStats, {
    name: 'clipReactionStats',
    filter: ({ clipReactionStats }, { clipId }) =>
      clipId === clipReactionStats.clipId,
  })
  clipReactionStatsUpdated(
    @Args({ name: 'clipId', type: () => ID })
    clipId: string,
  ) {
    return this.pubsub.asyncIterator('clipReactionStats');
  }
}
