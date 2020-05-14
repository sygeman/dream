import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Repository,
  FindOneOptions,
  FindManyOptions,
  FindConditions,
  DeepPartial,
} from 'typeorm';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { PUB_SUB } from '../../constants';
import { CommunityClip } from './communityClip.entity';

@Injectable()
export class CommunityClipService {
  constructor(
    @InjectRepository(CommunityClip)
    private readonly communityClipRepository: Repository<CommunityClip>,
    @Inject(PUB_SUB) private readonly pubsub: RedisPubSub,
  ) {}

  async findOne(findOptions: FindOneOptions<CommunityClip>) {
    return await this.communityClipRepository.findOne(findOptions);
  }

  async find(findOptions: FindManyOptions<CommunityClip>) {
    return await this.communityClipRepository.find(findOptions);
  }

  async count(findOptions: FindManyOptions<CommunityClip>) {
    return await this.communityClipRepository.count(findOptions);
  }

  async create(data: DeepPartial<CommunityClip>) {
    const communityClip = new CommunityClip();

    Object.keys(data).forEach(key => {
      communityClip[key] = data[key];
    });

    return this.communityClipRepository.save(communityClip);
  }

  async update(findOptions: FindConditions<CommunityClip>, data: any) {
    await this.communityClipRepository.update(findOptions, data);
    const communityClip = await this.communityClipRepository.findOne(
      findOptions,
    );
    this.pubsub.publish('communityClip', { communityClip });

    return communityClip;
  }
}
