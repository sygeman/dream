import { Args, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from '@dream/prisma';
import { Channel } from './models/channel.model';

@Resolver(() => Channel)
export class ChannelResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => Channel)
  channel(@Args({ name: 'name', type: () => String }) name: string) {
    return this.prisma.channel.findFirst({
      where: { name },
    });
  }

  @Query(() => [Channel])
  channels(@Args({ name: 'name', type: () => String }) name: string) {
    return this.prisma.channel.findMany({
      where: {
        Community: {
          name,
        },
      },
    });
  }
}
