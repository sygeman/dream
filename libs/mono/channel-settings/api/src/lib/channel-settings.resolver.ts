import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { PrismaService } from '@dream/mono-prisma';
import { ChannelSettings } from './models/channel-settings.model';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { Inject, UseGuards } from '@nestjs/common';
import { UpdateChannelSettingsInput } from './dto/update-channel-settings.input';
import { AuthGuard } from '@dream/mono-auth-api';

@Resolver(() => ChannelSettings)
export class ChannelSettingsResolver {
  constructor(
    private readonly prisma: PrismaService,
    @Inject('PUB_SUB') private readonly pubsub: RedisPubSub
  ) {}

  @Mutation(() => ChannelSettings)
  @UseGuards(AuthGuard)
  async updateChannelSettings(
    @Args({ name: 'input', type: () => UpdateChannelSettingsInput })
    input: UpdateChannelSettingsInput,
    @Context('userId') userId: string
  ) {
    const { channelId, communityId, ...data } = input;

    const community = await this.prisma.community.findUnique({
      where: { id: communityId },
      include: { channels: true },
    });

    if (community.ownerId !== userId) {
      throw 'Deny';
    }

    const channelWithSameName = await this.prisma.channel.findFirst({
      where: {
        communityId,
        name: input.name,
        deleted: false,
        id: { not: channelId },
      },
    });

    if (channelWithSameName) {
      throw 'Channel with same name is exists in the community';
    }

    return this.prisma.channel.update({
      where: { id: channelId },
      data: { ...data },
    });
  }
}
