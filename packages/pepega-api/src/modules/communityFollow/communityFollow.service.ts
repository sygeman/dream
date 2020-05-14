import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Repository,
  FindOneOptions,
  FindManyOptions,
  FindConditions,
  DeepPartial
} from 'typeorm';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { PUB_SUB } from '../../constants';
import { CommunityFollow } from './communityFollow.entity';

@Injectable()
export class CommunityFollowService {
  constructor(
    @InjectRepository(CommunityFollow)
    private readonly communityFollowRepository: Repository<CommunityFollow>,
    @Inject(PUB_SUB) private readonly pubsub: RedisPubSub
  ) {}

  async findOne(findOptions: FindOneOptions<CommunityFollow>) {
    return await this.communityFollowRepository.findOne(findOptions);
  }

  async find(findOptions: FindManyOptions<CommunityFollow>) {
    return await this.communityFollowRepository.find(findOptions);
  }

  async count(findOptions: FindManyOptions<CommunityFollow>) {
    return await this.communityFollowRepository.count(findOptions);
  }

  async create(data: DeepPartial<CommunityFollow>) {
    const newCommunityFollow = new CommunityFollow();

    Object.keys(data).forEach(key => {
      newCommunityFollow[key] = data[key];
    });

    const communityFollow = await this.communityFollowRepository.save(
      newCommunityFollow
    );

    this.pubsub.publish('communityFollow', { communityFollow });

    return communityFollow;
  }

  async update(findOptions: FindConditions<CommunityFollow>, data: any) {
    await this.communityFollowRepository.update(findOptions, data);
    const communityFollow = await this.communityFollowRepository.findOne(
      findOptions
    );

    this.pubsub.publish('communityFollow', { communityFollow });

    return communityFollow;
  }
}
