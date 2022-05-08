import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

import { ClipReactionType } from './types/ClipReactionType';

import { Clip } from '../clip/clip.entity';
import { User } from '../user/user.entity';

@Entity()
export class ClipReaction {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column({
    type: 'enum',
    enum: ClipReactionType,
    default: ClipReactionType.none,
  })
  type: ClipReactionType;

  @Column()
  clipId: string;

  @ManyToOne(type => Clip, clip => clip.communityClips)
  clip: Clip;

  @Column({ type: 'uuid' })
  userId: string;

  @ManyToOne(type => User, user => user.clipReactions)
  user: User;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: string;
}
