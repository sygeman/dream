import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Repository,
  FindOneOptions,
  FindManyOptions,
  FindConditions,
  DeepPartial
} from 'typeorm';
import { User } from './user.entity';
import { CurrencyType } from '../wallet/types/CurrencyType';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>
  ) {}

  async findOne(findOptions?: FindOneOptions<User>): Promise<User> {
    return this.usersRepository.findOne(findOptions);
  }

  async find(findOptions?: FindManyOptions<User>): Promise<User[]> {
    return this.usersRepository.find(findOptions);
  }

  async count(findOptions: FindManyOptions<User>) {
    return await this.usersRepository.count(findOptions);
  }

  async create(): Promise<User> {
    const newUser = new User();
    return this.usersRepository.save(newUser);
  }

  async update(findOptions: FindConditions<User>, data: DeepPartial<User>) {
    return this.usersRepository.update(findOptions, data);
  }

  async top10ByCoins() {
    const usersQB = this.usersRepository.createQueryBuilder('user');

    usersQB.leftJoinAndSelect('user.wallets', 'wallet');
    usersQB.andWhere('wallet.currency = :currency', {
      currency: CurrencyType.coin
    });
    usersQB.orderBy('wallet.balance', 'DESC');
    usersQB.take(10);

    return usersQB.getMany();
  }
}
