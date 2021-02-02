import { Inject } from '@nestjs/common';
import { Query, Subscription, Resolver, Args } from '@nestjs/graphql';
import { ChannelService } from './channel.service';
import { ChannelArgs } from './dto/channel.args';
import { Channel } from './models/channel';
import { ID } from 'type-graphql';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { PUB_SUB } from '../../constants';

@Resolver(of => Channel)
export class ChannelResolver {
  constructor(
    private readonly channelService: ChannelService,
    @Inject(PUB_SUB) private readonly pubsub: RedisPubSub,
  ) {}

  @Query(returns => [Channel])
  async channelsTop() {
    return this.channelService.topChannels();
  }

  @Query(returns => Channel)
  async channel(@Args() args: ChannelArgs) {
    return this.channelService.findOneById(args.where.id);
  }

  @Subscription(returns => Channel, {
    name: 'channel',
    filter: ({ channel }, { id }) => channel.id === id,
  })
  channelUpdated(@Args({ name: 'id', type: () => ID }) id: string) {
    return this.pubsub.asyncIterator('channel');
  }
}
