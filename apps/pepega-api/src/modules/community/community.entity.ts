import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn
} from 'typeorm';

import { CommunityClip } from '../communityClip/communityClip.entity';
import { Chat } from '../chat/chat.entity';

@Entity()
export class Community {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  description: string;

  @Column({ type: 'varchar', nullable: true })
  avatar: string;

  @Column({ type: 'uuid', nullable: true })
  mainChatId: string;

  @Column({ type: 'int', nullable: true, default: 0 })
  costCreateClip: number;

  @OneToOne(type => Chat)
  @JoinColumn({ name: 'mainChatId' })
  mainChat: Chat;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: string;

  @OneToMany(
    type => CommunityClip,
    communityClip => communityClip.community
  )
  clips: CommunityClip[];
}
