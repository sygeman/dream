import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';

import { Community } from '../community/community.entity';
import { User } from '../user/user.entity';

@Entity()
export class CommunityFollow {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'boolean', nullable: true, default: false })
  follow: boolean;

  @Column({ type: 'uuid' })
  communityId: string;

  @ManyToOne(
    type => Community,
    community => community.clips
  )
  community: Community;

  @Column({ type: 'varchar' })
  userId: string;

  @ManyToOne(
    type => User,
    user => user.followCommunities
  )
  @JoinColumn({ name: 'userId' })
  user: User;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: string;
}
