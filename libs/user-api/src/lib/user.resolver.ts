import { Args, Context, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from '@dream/prisma';
import { User } from './models/user.model';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@dream/auth-api';
import { Locale } from '.prisma/client';

@Resolver(() => User)
export class UserResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => User, { nullable: true })
  async user(
    @Args({ name: 'id', type: () => ID, nullable: true })
    id: string,
    @Context('userId') userId
  ) {
    if (!id) {
      if (!userId) return null;
      id = userId;
    }

    return this.prisma.user.findFirst({
      where: { id },
      include: { profiles: true },
    });
  }

  @UseGuards(AuthGuard)
  @Query(() => User)
  me(@Context('userId') userId): Promise<User> {
    return this.prisma.user.findFirst({
      where: { id: userId },
      include: { profiles: true },
    });
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Boolean)
  async setUserLocale(
    @Args({ name: 'locale', type: () => Locale })
    locale: Locale,
    @Context('userId') userId
  ): Promise<boolean> {
    await this.prisma.user.update({
      where: { id: userId },
      data: { locale },
    });

    return true;
  }
}
