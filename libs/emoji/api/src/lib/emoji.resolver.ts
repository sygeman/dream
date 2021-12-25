import { Args, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from '@dream/prisma';
import { Emoji } from './models/emoji.model';

@Resolver(() => Emoji)
export class EmojiResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => [Emoji])
  emojis(@Args({ name: 'communityId' }) communityId: string) {
    return this.prisma.emoji.findMany({
      where: { communityId },
      include: { author: true },
    });
  }
}
