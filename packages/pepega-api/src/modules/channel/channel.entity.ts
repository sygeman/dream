import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { Clip } from '../clip/clip.entity';
import { ChannelPromoter } from '../channelPromoter/channelPromoter.entity';

@Entity()
export class Channel {
  @PrimaryColumn({ type: 'varchar', unique: true })
  id: string;

  @Column({ type: 'varchar', unique: true })
  name: string;

  @Column({ type: 'varchar' })
  avatar: string;

  @Column({ type: 'varchar', nullable: true })
  title: string;

  @Column({ type: 'boolean', nullable: true, default: false })
  live: boolean;

  @Column({ type: 'int', nullable: true, default: 0 })
  cost: number;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: string;

  @OneToMany(type => Clip, clip => clip.channel)
  clips: Clip[];

  @OneToMany(
    type => ChannelPromoter,
    channelPromoter => channelPromoter.channel,
  )
  promoters: ChannelPromoter[];
}
