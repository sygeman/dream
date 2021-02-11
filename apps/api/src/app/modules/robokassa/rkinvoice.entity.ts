import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { InvoiceStatus } from './types/InvoiceStatus.enum';
import { InvoiceType } from './types/InvoiceType.enum';

import { Wallet } from '../wallet/wallet.entity';

@Entity()
export class RKInvoice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: InvoiceStatus,
    default: InvoiceStatus.paywait,
  })
  status: InvoiceStatus;

  @Column({
    type: 'enum',
    enum: InvoiceType,
    default: InvoiceType.realcoin,
  })
  type: InvoiceType;

  @Column()
  amount: number;

  @Column()
  sum: number;

  @Column({ type: 'uuid' })
  walletId: string;

  @ManyToOne(type => Wallet, wallet => wallet.id)
  @JoinColumn({ name: 'walletId' })
  wallet: Wallet;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: string;
}
