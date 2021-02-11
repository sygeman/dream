import { Injectable, Inject, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Repository,
  FindOneOptions,
  FindManyOptions,
  FindConditions,
} from 'typeorm';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { Clip } from './clip.entity';
import { TwitchService } from '../twitch/twitch.service';
import { ChannelService } from '../channel/channel.service';
import { ClipReactionService } from '../clipReaction/clipReaction.service';
import { ClipsArgs, ClipOrderName } from './dto/clips.args';

@Injectable()
export class ClipService {
  constructor(
    @InjectQueue() readonly appQueue: Queue,
    @InjectRepository(Clip)
    private readonly clipRepository: Repository<Clip>,
    @Inject('PUB_SUB') private readonly pubsub: RedisPubSub,
    private readonly twitchService: TwitchService,
    private readonly channelService: ChannelService,
    private readonly clipReactionService: ClipReactionService
  ) {}

  async isInHistory(clipId: string, userId: string) {
    const clipsQB = this.clipRepository.createQueryBuilder('clip');

    clipsQB.where('clip.id = :clipId', { clipId });
    clipsQB.leftJoinAndSelect('clip.history', 'history');
    clipsQB.andWhere('history.userId = :userId', { userId });

    const count = await clipsQB.getCount();
    return count > 0;
  }

  async clips({
    startedAt,
    orderBy,
    ratingMin,
    likedUserId,
    communityId,
    communityClipAuthorId,
    historyUserId,
    collectionId,
    limit,
    offset,
  }: ClipsArgs) {
    const clipsQB = this.clipRepository.createQueryBuilder('clip');

    clipsQB.leftJoinAndSelect('clip.reactionStats', 'reactionStats');
    clipsQB.leftJoinAndSelect('clip.channel', 'channel');
    clipsQB.leftJoinAndSelect('clip.communityClips', 'communityClip');

    if (startedAt) {
      clipsQB.andWhere('clip.created_at >= :startedAt', {
        startedAt,
      });
    }

    if (communityId) {
      clipsQB.andWhere('communityClip.communityId = :communityId', {
        communityId,
      });
    }

    if (communityClipAuthorId) {
      clipsQB.andWhere('communityClip.authorId = :communityClipAuthorId', {
        communityClipAuthorId,
      });
    }

    if (historyUserId) {
      clipsQB.leftJoinAndSelect('clip.history', 'history');

      clipsQB.andWhere('history.userId = :historyUserId', {
        historyUserId,
      });
    }

    if (collectionId) {
      clipsQB.leftJoinAndSelect('clip.collectionClips', 'collectionClip');

      clipsQB.andWhere('collectionClip.clipCollectionId = :collectionId', {
        collectionId,
      });
    }

    if (typeof ratingMin === 'number') {
      clipsQB.andWhere('reactionStats.rating >= :ratingMin', { ratingMin });
    }

    if (likedUserId) {
      clipsQB.leftJoinAndSelect('clip.reactions', 'reaction');
      clipsQB.andWhere('reaction.userId = :likedUserId', { likedUserId });
      clipsQB.andWhere('reaction.type = :reactionType', {
        reactionType: 'like',
      });
    }

    switch (orderBy.name) {
      case ClipOrderName.clipRating: {
        clipsQB.orderBy({
          'reactionStats.rating': orderBy.type,
        });
        break;
      }
      case ClipOrderName.clipCreatedAt: {
        clipsQB.orderBy({
          'clip.created_at': orderBy.type,
        });
        break;
      }
      case ClipOrderName.communityClipCreatedAt: {
        clipsQB.orderBy({
          'communityClip.createdAt': orderBy.type,
        });
        break;
      }
      case ClipOrderName.clipReactionUpdatedAt: {
        clipsQB.orderBy({
          'reaction.updatedAt': orderBy.type,
        });
        break;
      }
      case ClipOrderName.clipHistoryUpdatedAt: {
        clipsQB.orderBy({
          'history.updatedAt': orderBy.type,
        });
        break;
      }
    }

    clipsQB.skip(offset);
    clipsQB.take(limit);

    const [clips, count] = await clipsQB.getManyAndCount();

    return { clips, count };
  }

  async getById(id: string) {
    Logger.log(`getById ${id}`, `clip`);

    let clip = await this.findOne({ where: { id } });

    if (!clip) {
      clip = await this.create(id);
    }

    return clip;
  }

  async findOne(findOptions: FindOneOptions<Clip>) {
    return await this.clipRepository.findOne(findOptions);
  }

  async find(findOptions: FindManyOptions<Clip>) {
    return await this.clipRepository.find(findOptions);
  }

  async findAndCount(findOptions: FindManyOptions<Clip>) {
    return await this.clipRepository.findAndCount(findOptions);
  }

  async count(findOptions: FindManyOptions<Clip>) {
    return await this.clipRepository.count(findOptions);
  }

  async create(
    id: string,
    data?: { likes?: number; dislikes?: number; rating?: number }
  ) {
    const twitchClips = await this.twitchService.clips({ id, first: 1 });

    if (!twitchClips.data || twitchClips.data.length !== 1) {
      throw new Error(`Clip ${id} not found`);
    }

    const twitchClip = twitchClips.data[0];

    // channel?
    const twitchUser = await this.twitchService.user({
      id: twitchClip.broadcaster_id,
    });

    if (!twitchUser) {
      throw new Error(`Channel ${twitchClip.broadcaster_id} not found`);
    }

    await this.channelService.upsert(twitchUser.id, {
      name: twitchUser.login,
      avatar: twitchUser.profile_image_url,
    });

    const clip = new Clip();
    clip.id = twitchClip.id;
    clip.title = twitchClip.title;
    clip.thumbnail_url = twitchClip.thumbnail_url;
    clip.language = twitchClip.language;
    clip.broadcaster_id = twitchClip.broadcaster_id;
    clip.creator_id = twitchClip.creator_id;
    clip.video_id = twitchClip.video_id;
    clip.game_id = twitchClip.game_id;
    clip.created_at = twitchClip.created_at;

    if (data) {
      Object.keys(data).forEach((key) => {
        clip[key] = data[key];
      });
    }

    // TODO: Rethink this
    const clipReactionStats = await this.clipReactionService.createStats(id);
    clip.reactionStatsId = clipReactionStats.id;

    return this.clipRepository.save(clip);
  }

  async remove(findOptions: FindConditions<Clip>) {
    return this.clipRepository.delete(findOptions);
  }

  async update(findOptions: FindConditions<Clip>, data: any) {
    await this.clipRepository.update(findOptions, data);
    const clip = await this.clipRepository.findOne(findOptions);
    this.pubsub.publish('clip', { clip });
  }

  async upsertById(id: string, data) {
    const clip = await this.findOne({ where: { id } });
    return clip ? this.update({ id }, data) : this.create(id, data);
  }
}
