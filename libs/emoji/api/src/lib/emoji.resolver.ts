import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from '@dream/prisma/mono';
import { Emoji } from './models/emoji.model';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@dream/auth-api';

@Resolver(() => Emoji)
export class EmojiResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => Emoji)
  emoji(@Args({ name: 'emojiId' }) emojiId: string) {
    return this.prisma.emoji.findUnique({
      where: { id: emojiId },
      include: { author: true },
    });
  }

  @Query(() => [Emoji])
  emojis(@Args({ name: 'communityId' }) communityId: string) {
    return this.prisma.emoji.findMany({
      where: { communityId },
      orderBy: { createdAt: 'asc' },
      include: { author: true },
    });
  }

  @Mutation(() => Emoji)
  @UseGuards(AuthGuard)
  updateEmojiAlias(
    @Args({ name: 'emojiId' }) emojiId: string,
    @Args({ name: 'alias' }) alias: string
  ) {
    return this.prisma.emoji.update({
      where: { id: emojiId },
      data: { alias },
      include: { author: true },
    });
  }

  @Mutation(() => Boolean)
  @UseGuards(AuthGuard)
  async deleteEmoji(@Args({ name: 'emojiId' }) emojiId: string) {
    await this.prisma.emoji.delete({ where: { id: emojiId } });
    return true;
  }
}
