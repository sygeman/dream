import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Community } from '../community/community.entity';
import { Clip } from '../clip/clip.entity';
import { User } from '../user/user.entity';

@Entity()
export class CommunityClip {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  communityId: string;

  @ManyToOne(type => Community, community => community.clips)
  community: Community;

  @Column({ type: 'varchar' })
  clipId: string;

  @ManyToOne(type => Clip, clip => clip.communityClips)
  clip: Clip;

  @Column({ type: 'varchar', length: 100 })
  title: string;

  @Column({ type: 'boolean', nullable: true, default: false })
  nfws: boolean;

  @Column({ type: 'boolean', nullable: true, default: false })
  spoiler: boolean;

  @Column({ type: 'boolean', nullable: true, default: false })
  approved: boolean;

  @Column({ type: 'uuid' })
  authorId: string;

  @ManyToOne(type => User, user => user.communityClips)
  @JoinColumn({ name: 'authorId' })
  user: User;

  @Column({ type: 'boolean', nullable: true, default: false })
  deleted: boolean;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: string;

  @Column({ type: 'uuid', nullable: true })
  postId: string;
}
