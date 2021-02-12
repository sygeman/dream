import { UseGuards, Inject } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { ProfileService } from './profile.service';
import { AuthGuard } from '@dream/auth-api';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { Profile } from './models/profile';
import { ID } from '@nestjs/graphql';

@Resolver((of) => Profile)
export class ProfileResolvers {
  constructor(
    private readonly profileService: ProfileService,
    @Inject('PUB_SUB') private readonly pubsub: RedisPubSub
  ) {}

  @Query((returns) => String, { nullable: true })
  async twitchProfileId(@Context('userId') userId: string) {
    const profile = await this.profileService.findOne({
      where: { serviceName: 'twitch', userId },
    });

    return profile ? profile.serviceId : null;
  }

  @Mutation((returns) => Boolean)
  @UseGuards(AuthGuard)
  async setUserProfileVisible(
    @Args({ name: 'id', type: () => ID })
    id: string,
    @Args('visible') visible: boolean,
    @Context('userId') userId: string
  ) {
    const profile = await this.profileService.findOne({
      where: { id: id, userId },
    });

    if (!profile) {
      throw new Error(`Profile ${id} not found`);
    }

    await this.profileService.updateById(id, {
      visible: visible,
    });

    this.pubsub.publish('userProfileVisibleChanged', {
      userProfileVisibleChanged: { id: id, visible: visible },
      id: userId,
    });

    return visible;
  }
}
