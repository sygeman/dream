import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Clip } from '../clip/clip.entity';
import { User } from '../user/user.entity';

@Entity()
export class ClipComment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  clipId: string;

  @ManyToOne(type => Clip, clip => clip.comments)
  clip: Clip;

  @Column({ type: 'varchar' })
  content: string;

  @Column({ type: 'uuid' })
  authorId: string;

  @ManyToOne(type => User, user => user.clipComments)
  @JoinColumn({ name: 'authorId' })
  author: User;

  @Column({ type: 'boolean', nullable: true, default: false })
  deleted: boolean;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: string;
}
