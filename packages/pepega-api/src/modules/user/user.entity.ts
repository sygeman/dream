import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from 'typeorm';

import { UserRole } from './types/UserRole';

import { Wallet } from '../wallet/wallet.entity';
import { Token } from '../auth/tokens.entity';
import { Connection } from '../connection/connection.entity';
import { Profile } from '../profile/profile.entity';
import { ChatMessage } from '../chat/chatMessage.entity';
import { ClipHistory } from '../clipHistory/clipHistory.entity';
import { ClipComment } from '../clipComment/clipComment.entity';
import { ClipReaction } from '../clipReaction/clipReaction.entity';
import { CommunityClip } from '../communityClip/communityClip.entity';
import { ChannelPromoter } from '../channelPromoter/channelPromoter.entity';
import { CommunityFollow } from '../communityFollow/communityFollow.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.user })
  role: UserRole;

  @Column({ nullable: true })
  name?: string;

  @Column({ nullable: true })
  avatar?: string;

  @Column({ type: 'uuid', nullable: true })
  mainProfileId: string;

  // mainProfile

  // base64
  @Column({ type: 'varchar', nullable: true })
  lastIP: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: string;

  @Column({ type: 'boolean', nullable: true, default: false })
  banned: boolean;

  @OneToMany(
    type => Token,
    token => token.user
  )
  tokens: Token[];

  @OneToMany(
    type => Connection,
    connection => connection.user
  )
  connections: Connection[];

  @OneToMany(
    type => Profile,
    profile => profile.userId
  )
  profiles: Profile[];

  @OneToMany(
    type => Wallet,
    wallet => wallet.user
  )
  wallets: Wallet[];

  @OneToMany(
    type => ClipHistory,
    clipHistory => clipHistory.clip
  )
  historyClips: ClipHistory[];

  @OneToMany(
    type => CommunityClip,
    communityClip => communityClip.clip
  )
  communityClips: CommunityClip[];

  @OneToMany(
    type => CommunityFollow,
    communityFollow => communityFollow.user
  )
  followCommunities: CommunityFollow[];

  @OneToMany(
    type => ChannelPromoter,
    channelPromoter => channelPromoter.user
  )
  channelPromoters: ChannelPromoter[];

  @OneToMany(
    type => ClipComment,
    clipComment => clipComment.author
  )
  clipComments: ClipComment[];

  @OneToMany(
    type => ClipReaction,
    clipReaction => clipReaction.user
  )
  clipReactions: ClipReaction[];

  @OneToMany(
    type => ChatMessage,
    chatMessage => chatMessage.authorId
  )
  chatMessages: ChatMessage[];
}
