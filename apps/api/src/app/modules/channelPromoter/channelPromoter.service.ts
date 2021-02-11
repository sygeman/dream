import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindConditions, DeepPartial } from 'typeorm';
import { ChannelPromoter } from './channelPromoter.entity';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { ChannelService } from '../channel/channel.service';

@Injectable()
export class ChannelPromoterService {
  constructor(
    @InjectRepository(ChannelPromoter)
    private readonly channelPromoterRepository: Repository<ChannelPromoter>,
    private readonly channelService: ChannelService,
    @Inject('PUB_SUB') private readonly pubsub: RedisPubSub
  ) {}

  async findOneById(id: string) {
    return this.channelPromoterRepository.findOne(id);
  }

  async find(where) {
    return this.channelPromoterRepository.find({ where });
  }

  async create(data: { channelId: string; userId: string }) {
    const channelPromotion = await this.channelPromoterRepository.save(
      this.channelPromoterRepository.create({
        ...data,
        uniqKey: `${data.channelId}-${data.userId}`,
      })
    );

    this.pubsub.publish('channelPromoterCreated', {
      channelPromoterCreated: channelPromotion,
    });

    return channelPromotion;
  }

  async cost(channelId: string) {
    const qb = this.channelPromoterRepository.createQueryBuilder(
      'channelPromotion'
    );

    qb.select(`SUM(channelPromotion.cost)`, 'sum');
    qb.where(`channelPromotion.active = TRUE`);
    qb.andWhere(`channelPromotion.channelId = :channelId`, { channelId });

    const query = await qb.getRawOne();
    const { sum } = query;

    const cost = parseInt(sum, 10) || 0;
    return cost;
  }

  async update({
    where,
    data,
  }: {
    where: FindConditions<ChannelPromoter>;
    data: DeepPartial<ChannelPromoter>;
  }) {
    const promoter = await this.channelPromoterRepository.findOne({ where });

    Object.keys(data).forEach((key) => {
      if (promoter.hasOwnProperty(key)) {
        promoter[key] = data[key];
      }
    });

    return this.channelPromoterRepository.save(promoter);
  }

  async delete(entity: ChannelPromoter) {
    return this.channelPromoterRepository.remove(entity);
  }

  async top() {
    const queryBuilder = this.channelPromoterRepository.createQueryBuilder(
      'channelPromotion'
    );

    queryBuilder.select(`SUM(channelPromotion.cost)`, 'sum');
    queryBuilder.addSelect('channelPromotion.channelId', 'channelId');
    queryBuilder.groupBy('channelPromotion.channelId');
    queryBuilder.addGroupBy('channelPromotion.createdAt');
    queryBuilder.where(`channelPromotion.active = TRUE`);
    queryBuilder.orderBy('sum', 'DESC');
    queryBuilder.addOrderBy('channelPromotion.createdAt', 'DESC');
    queryBuilder.limit(6);

    const channels = await queryBuilder.getRawMany();

    return channels.map(({ channelId, sum }) => ({
      channelId,
      cost: parseInt(sum, 10),
    }));
  }

  async recalcChannelCost(channelId: string) {
    const cost = await this.cost(channelId);
    await this.channelService.updateById(channelId, { cost });
  }

  async findByUserId(userId: string) {
    const channelPromoters = await this.find({ userId });
    return { nodes: channelPromoters };
  }

  async channelCost({ channelId }) {
    const cost = await this.cost(channelId);
    return { cost };
  }

  async updateById({ id, data }) {
    const channelPromoter = await this.update({
      where: { id },
      data,
    });

    this.pubsub.publish('channelPromoter', { channelPromoter });

    await this.recalcChannelCost(channelPromoter.channelId);
    return channelPromoter;
  }

  async deleteById(id: string) {
    const channelPromoter = await this.findOneById(id);
    const channelPromoterPrev = { ...channelPromoter };
    await this.channelPromoterRepository.remove(channelPromoter);

    this.pubsub.publish('channelPromoterDeleted', {
      channelPromoterDeleted: channelPromoterPrev,
    });

    await this.recalcChannelCost(channelPromoterPrev.channelId);
    return channelPromoterPrev;
  }
}
