import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

import { Channel } from '../channel/channel.entity';
import { User } from '../user/user.entity';

@Entity()
export class ChannelPromoter {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, type: 'varchar' })
  uniqKey: string;

  @Column({ type: 'boolean', nullable: true, default: false })
  active: boolean;

  @Column({ type: 'int', nullable: true, default: 1 })
  cost: number;

  @Column({ type: 'varchar' })
  channelId: string;

  @ManyToOne(type => Channel, channel => channel.promoters)
  channel: Channel;

  @Column({ type: 'uuid' })
  userId: string;

  @ManyToOne(type => User, user => user.channelPromoters)
  user: User;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: string;
}
