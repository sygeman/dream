import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

import { Clip } from '../clip/clip.entity';
import { User } from '../user/user.entity';

@Entity()
export class ClipHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  clipId: string;

  @ManyToOne(type => Clip, clip => clip.communityClips)
  clip: Clip;

  @Column({ type: 'uuid' })
  userId: string;

  @ManyToOne(type => User, user => user.historyClips)
  user: User;

  @Column({ nullable: true, default: 1 })
  count: number;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: string;
}
