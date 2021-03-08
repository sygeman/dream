import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { PrismaService } from '@dream/prisma';
import { ModeWaitlist } from './models/mode-waitlist.model';
import { Inject, UseGuards } from '@nestjs/common';
import { RedisPubSub } from 'graphql-redis-subscriptions';
// import { AuthGuard } from '@dream/auth-api';
// import { CreateCommunityInput } from './dto/createCommunity.input';

@Resolver()
export class ModeWaitlistResolver {
  constructor(
    private prisma: PrismaService,
    @Inject('PUB_SUB') private readonly pubsub: RedisPubSub
  ) {}

  @Query(() => ModeWaitlist)
  modeWaitlist(@Args({ name: 'channelId' }) channelId: string) {
    return this.prisma.modeWaitlist.findFirst({ where: { channelId } });
  }

  @Query(() => [Boolean])
  modeWaitlistQueue(@Args({ name: 'channelId' }) channelId: string) {
    return [true];
  }

  // mutation
  //     addTrack()
  //     removeTrack()
  //     skip()

  @Subscription(() => ModeWaitlist, {
    filter: ({ modeWaitlistUpdated }, { channelId }) =>
      modeWaitlistUpdated.channelId === channelId,
  })
  modeWaitlistUpdated(
    @Args({ name: 'channelId', type: () => String }) channelId: string
  ) {
    return this.pubsub.asyncIterator('modeWaitlistUpdated');
  }
}
