import {
  Args,
  Context,
  ID,
  Int,
  Mutation,
  Query,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { AuthGuard } from '@dream/pepega/auth/api';
import { PrismaService } from '@dream/pepega-prisma';
import { ClipScore } from './models/clip-score.model';
import { Inject, Logger, UseGuards } from '@nestjs/common';
import { ClipService } from '@dream/pepega/clip/api';
import { UserCoinService } from '@dream/pepega/user-coin/api';

const CHANGE_SCORE_COST = 10;

@Resolver(() => ClipScore)
export class ClipScoreResolver {
  private readonly logger = new Logger(ClipScoreResolver.name);

  constructor(
    private prisma: PrismaService,
    private clipService: ClipService,
    private userCoinService: UserCoinService,
    @Inject('PUB_SUB') private readonly pubsub: RedisPubSub
  ) {}

  @Query(() => Int)
  async clipScore(
    @Args({ name: 'clipId', type: () => String })
    clipId: string
  ) {
    const clip = await this.prisma.clip.findUnique({ where: { id: clipId } });
    return clip.score;
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Boolean)
  async increaseClipScore(
    @Args({ name: 'clipId', type: () => String })
    clipId: string,
    @Context('userId') userId: string
  ) {
    this.logger.log(`increaseClipScore - ${clipId}`);
    const clip = await this.clipService.clip(clipId);

    await this.userCoinService.decrease(userId, CHANGE_SCORE_COST);

    const clipUpdated = await this.prisma.clip.update({
      where: { id: clip.id },
      data: { score: { increment: CHANGE_SCORE_COST } },
    });

    this.pubsub.publish('clipScoreUpdated', {
      clipId: clipUpdated.id,
      clipScoreUpdated: clipUpdated.score,
    });

    return true;
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Boolean)
  async decreaseClipScore(
    @Args({ name: 'clipId', type: () => String })
    clipId: string,
    @Context('userId') userId: string
  ) {
    this.logger.log(`decreaseClipScore - ${clipId}`);
    const clip = await this.clipService.clip(clipId);

    await this.userCoinService.decrease(userId, CHANGE_SCORE_COST);

    const clipUpdated = await this.prisma.clip.update({
      where: { id: clip.id },
      data: { score: { decrement: CHANGE_SCORE_COST } },
    });

    this.pubsub.publish('clipScoreUpdated', {
      clipId: clipUpdated.id,
      clipScoreUpdated: clipUpdated.score,
    });

    return true;
  }

  @Subscription(() => Int, {
    filter: ({ clipId }, args) => clipId === args.clipId,
  })
  clipScoreUpdated(
    @Args({ name: 'clipId', type: () => String }) clipId: string
  ) {
    return this.pubsub.asyncIterator('clipScoreUpdated');
  }
}
