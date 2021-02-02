import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';

import { Clip } from '../clip/clip.entity';

@Entity()
export class ClipReactionStats {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column({ unique: true })
  clipId: string;

  @Column({ default: 0 })
  likes: number;

  @Column({ default: 0 })
  dislikes: number;

  @Column({ default: 0 })
  rating: number;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: string;

  @OneToOne(type => Clip, clip => clip.reactionStats)
  clip: Clip;
}
