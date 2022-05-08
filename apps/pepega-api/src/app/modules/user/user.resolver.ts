import { UseGuards } from '@nestjs/common';
import { Query, Resolver, Args, Context } from '@nestjs/graphql';
import { UsersService } from './user.service';
import { AuthGuard, AdminGuard } from '../../guards';
import { User } from './models/user';
import { UserTop } from './models/userTop';
import { ID, Int } from 'type-graphql';

@Resolver(of => User)
export class UsersResolvers {
  constructor(private readonly usersService: UsersService) {}

  @Query(returns => User, { nullable: true })
  async user(
    @Args({ name: 'id', type: () => ID, nullable: true })
    id: string,
    @Context('userId') userId
  ) {
    if (!id) {
      if (!userId) {
        return null;
      }

      id = userId;
    }

    return await this.usersService.findOne({ where: { id } });
  }

  @Query(returns => [UserTop])
  async usersTopByCoins() {
    const users = await this.usersService.top10ByCoins();
    return users.map(user => {
      return {
        id: `ut-${user.id}`,
        count: user.wallets[0].balance,
        user
      };
    });
  }

  @Query(returns => Int)
  @UseGuards(AuthGuard, AdminGuard)
  async usersCount() {
    return this.usersService.count({});
  }
}
