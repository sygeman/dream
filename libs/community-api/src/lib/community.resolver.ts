import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PrismaService } from '@dream/prisma';
import { Community } from './models/community.model';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@dream/auth-api';
import { CreateCommunityInput } from './dto/createCommunity.input';

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

  @Mutation(() => Community)
  @UseGuards(AuthGuard)
  async createCommunity(
    @Args({ name: 'input', type: () => CreateCommunityInput })
    input: CreateCommunityInput,
    @Context('userId') userId: string
  ) {
    const count = await this.prisma.community.count({
      where: { ownerId: userId },
    });

    if (count > 1) {
      throw 'Deny';
    }

    return this.prisma.community.create({
      data: {
        ...input,
        ownerId: userId,
      },
    });
  }
}
