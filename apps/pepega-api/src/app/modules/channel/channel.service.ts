import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Repository,
  MoreThan,
  MoreThanOrEqual,
  DeepPartial,
  FindManyOptions
} from 'typeorm';
import { Channel } from './channel.entity';
import { from, of } from 'rxjs';
import { delay, concatMap } from 'rxjs';
import { TwitchService } from '../twitch/twitch.service';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { PUB_SUB } from '../../constants';
import * as ms from 'ms';

@Injectable()
export class ChannelService {
  constructor(
    @Inject(PUB_SUB)
    private readonly pubsub: RedisPubSub,
    @InjectRepository(Channel)
    private readonly channelRepository: Repository<Channel>,
    private readonly twitchService: TwitchService
  ) {}

  async findOneById(id: string) {
    return this.channelRepository.findOne(id);
  }

  async find(options?: FindManyOptions<Channel>) {
    return this.channelRepository.find(options);
  }

  async findOne({ userId }) {
    return this.channelRepository.find({ where: { userId } });
  }

  async topChannels() {
    const channels = await this.channelRepository.find({
      where: {
        live: true,
        cost: MoreThan(0)
      },
      order: {
        cost: 'DESC',
        createdAt: 'ASC'
      },
      take: 6
    });

    return channels;
  }

  async upsert(channelId: string, data: DeepPartial<Channel> = {}) {
    let channel = await this.channelRepository.findOne(channelId);

    if (!channel) {
      channel = await this.channelRepository.save(
        this.channelRepository.create({
          id: channelId,
          ...data
        })
      );
    }

    this.pubsub.publish('channel', { channel });

    return channel;
  }

  async updateById(channelId: string, data: DeepPartial<Channel> = {}) {
    const channel = await this.channelRepository.findOne({
      where: { id: channelId }
    });

    Object.keys(data).forEach(key => {
      if (channel.hasOwnProperty(key)) {
        channel[key] = data[key];
      }
    });

    const updatedChannel = await this.channelRepository.save(channel);

    this.pubsub.publish('channel', { channel: updatedChannel });

    return updatedChannel;
  }

  async updateRichChannels() {
    let minCost = 1;
    const topChannels = await this.topChannels();
    const topChannelsCount = topChannels.length;
    const topIsFull = topChannelsCount >= 6;

    if (topIsFull) {
      minCost = topChannels[topChannelsCount - 1].cost;
    }

    // console.log({ topChannelsCount, topIsFull, minCost });

    const channels = await this.find({
      where: {
        cost: MoreThanOrEqual(minCost)
      }
    });

    from(channels)
      .pipe(concatMap(item => of(item).pipe(delay(ms('2s')))))
      .subscribe(channel => this.updateChannel(channel));
  }

  async updateChannel(channel: Channel) {
    const stream = await this.twitchService.stream({ userId: channel.id });
    const channelId = channel.id;

    if (!stream) {
      if (channel.live) {
        return this.updateById(channelId, { live: false });
      }

      return null;
    }

    if (channel.title !== stream.title || !channel.live) {
      return this.updateById(channelId, { live: true, title: stream.title });
    }
  }
}
