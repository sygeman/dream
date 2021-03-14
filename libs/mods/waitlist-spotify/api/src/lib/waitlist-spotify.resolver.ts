import { Args, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PrismaService } from '@dream/prisma';
import { WaitlistSpotify } from './models/waitlist-spotify.model';
import { Inject } from '@nestjs/common';
import { RedisPubSub } from 'graphql-redis-subscriptions';

@Resolver()
export class WaitlistSpotifyResolver {
  constructor(
    private prisma: PrismaService,
    @Inject('PUB_SUB') private readonly pubsub: RedisPubSub
  ) {}

  @Query(() => WaitlistSpotify)
  waitlistSpotify(@Args({ name: 'channelId' }) channelId: string) {
    return this.prisma.modeWaitlistSpotify.findFirst({ where: { channelId } });
  }

  @Subscription(() => WaitlistSpotify, {
    filter: ({ waitlistSpotifyUpdated }, { channelId }) =>
      waitlistSpotifyUpdated.channelId === channelId,
  })
  waitlistSpotifyUpdated(
    @Args({ name: 'channelId', type: () => String }) channelId: string
  ) {
    return this.pubsub.asyncIterator('waitlistSpotifyUpdated');
  }
}
