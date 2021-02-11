import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Repository,
  FindOneOptions,
  FindManyOptions,
  DeepPartial,
  MoreThanOrEqual,
  FindConditions,
} from 'typeorm';
import { Wallet } from './wallet.entity';
import { RedisPubSub } from 'graphql-redis-subscriptions';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,
    @Inject('PUB_SUB') private readonly pubsub: RedisPubSub
  ) {}

  async findOne(findOptions?: FindOneOptions<Wallet>): Promise<Wallet> {
    return this.walletRepository.findOne(findOptions);
  }

  async find(findOptions?: FindManyOptions<Wallet>): Promise<Wallet[]> {
    return this.walletRepository.find(findOptions);
  }

  async count(findOptions: FindManyOptions<Wallet>) {
    return await this.walletRepository.count(findOptions);
  }

  async create(data: DeepPartial<Wallet>): Promise<Wallet> {
    return this.walletRepository.save(this.walletRepository.create(data));
  }

  async incrementBalance({ walletId, amount, userId, currency }: any) {
    const findOptions = walletId ? { id: walletId } : { userId, currency };
    await this.walletRepository.increment(findOptions, 'balance', amount);

    const wallet = await this.walletRepository.findOne(findOptions);
    this.pubsub.publish('wallet', { wallet });
  }

  async decrementBalance({ walletId, amount, userId, currency }: any) {
    const findOptions: FindConditions<Wallet> = walletId
      ? { id: walletId }
      : { userId, currency };

    findOptions.balance = MoreThanOrEqual(amount);

    const walletP = await this.walletRepository.findOne(findOptions);

    if (!walletP) {
      return { success: false };
    }

    await this.walletRepository.update(findOptions, {
      balance: () => `"balance" - ${amount}`,
    });

    const wallet = await this.walletRepository.findOne(findOptions);
    this.pubsub.publish('wallet', { wallet });

    return { success: true };
  }
}
