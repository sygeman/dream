import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

import { CurrencyType } from './types/CurrencyType';

import { User } from '../user/user.entity';

@Entity()
export class Wallet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: 0, nullable: true })
  balance: number;

  @Column({ type: 'enum', enum: CurrencyType, default: CurrencyType.coin })
  currency: CurrencyType;

  @Column({ type: 'uuid' })
  userId: string;

  @ManyToOne(type => User, user => user.wallets)
  user: User;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: string;
}
