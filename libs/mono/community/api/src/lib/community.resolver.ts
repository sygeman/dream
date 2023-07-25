import {
  Args,
  Context,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PrismaService } from '@dream/mono-prisma';
import { Community } from './models/community.model';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@dream/mono-auth-api';
import { CreateCommunityInput } from './dto/createCommunity.input';
import { UpdateCommunityInput } from './dto/updateCommunity.input';

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
      where: { name, deleted: false },
    });
  }

  @Query(() => [Community])
  communities() {
    return this.prisma.community.findMany({ where: { deleted: false } });
  }

  @Mutation(() => Community)
  @UseGuards(AuthGuard)
  async createCommunity(
    @Args({ name: 'input', type: () => CreateCommunityInput })
    input: CreateCommunityInput,
    @Context('userId') userId: string,
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

  @Mutation(() => Community)
  @UseGuards(AuthGuard)
  async updateCommunity(
    @Args({ name: 'input', type: () => UpdateCommunityInput })
    input: UpdateCommunityInput,
    @Context('userId') userId: string,
  ) {
    const { communityId, ...data } = input;

    const community = await this.prisma.community.findUnique({
      where: { id: communityId },
    });

    if (community.ownerId !== userId) {
      throw 'Deny';
    }

    const communityWithSameName = await this.prisma.community.findFirst({
      where: {
        name: input.name,
        id: { not: communityId },
      },
    });

    if (communityWithSameName) {
      throw 'Community with same name is exists';
    }

    return this.prisma.community.update({
      where: { id: communityId },
      data,
    });
  }

  @Mutation(() => Community)
  @UseGuards(AuthGuard)
  async deleteCommunity(
    @Args({ name: 'communityId', type: () => ID })
    communityId: string,
    @Context('userId') userId: string,
  ) {
    const communityIsExist = await this.prisma.community.findFirst({
      where: {
        id: communityId,
        ownerId: userId,
      },
    });

    if (!communityIsExist) {
      throw 'Deny';
    }

    return this.prisma.community.update({
      where: {
        id: communityId,
      },
      data: {
        deleted: true,
        name: null,
      },
    });
  }
}
