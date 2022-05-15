import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from '@dream/prisma/mono';
import { CommunitySettings } from './models/community-settings.model';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@dream/auth-api';
import { UpdateCommunitySettingsInput } from './dto/update-community-settings.input';

@Resolver(() => CommunitySettings)
export class CommunitySettingsResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => CommunitySettings)
  communitySettings(@Args({ name: 'name' }) name: string) {
    return this.prisma.community.findFirst({
      where: { name, deleted: false },
    });
  }

  @Mutation(() => CommunitySettings)
  @UseGuards(AuthGuard)
  async updateCommunitySettings(
    @Args({ name: 'input', type: () => UpdateCommunitySettingsInput })
    input: UpdateCommunitySettingsInput,
    @Context('userId') userId: string
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
}
