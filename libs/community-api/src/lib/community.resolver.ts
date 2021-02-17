import { Args, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from '@dream/prisma';
import { Community } from './models/community.model';

@Resolver(() => Community)
export class CommunityResolver {
  constructor(private prisma: PrismaService) {}

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
