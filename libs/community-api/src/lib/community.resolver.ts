import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { PrismaService } from '@dream/prisma';
import { Community } from './models/community.model';

@Resolver(() => Community)
export class CommunityResolver {
  constructor(private prisma: PrismaService) {}

  @ResolveField()
  async onlineCount(@Parent() community: Community) {
    const { id } = community;
    const connections = await this.prisma.connection.findMany({
      where: {
        channel: {
          communityId: id,
        },
      },
      select: { ipHash: true },
      distinct: ['ipHash'],
    });

    return connections.length;
  }

  @Query(() => Community)
  community(@Args({ name: 'name' }) name: string) {
    return this.prisma.community.findFirst({
      where: { name },
    });
  }

  @Query(() => [Community])
  communities() {
    return this.prisma.community.findMany();
  }
}
