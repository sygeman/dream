import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import { CommunityClip } from '../communityClip/communityClip.entity';
import { ClipCollectionClip } from '../clipCollection/clipCollectionClip.entity';
import { ClipReaction } from '../clipReaction/clipReaction.entity';
import { ClipReactionStats } from '../clipReaction/clipReactionStats.entity';
import { ClipComment } from '../clipComment/clipComment.entity';
import { Channel } from '../channel/channel.entity';
import { ClipHistory } from '../clipHistory/clipHistory.entity';

@Entity()
export class Clip {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'varchar', nullable: true })
  title: string;

  @Column({ type: 'varchar' })
  thumbnail_url: string;

  @Column({ type: 'varchar', nullable: true })
  language: string;

  @Column({ type: 'varchar' })
  broadcaster_id: string;

  @Column({ type: 'varchar' })
  creator_id: string;

  @Column({ type: 'varchar', nullable: true })
  video_id: string;

  @Column({ type: 'varchar', nullable: true })
  game_id: string;

  @Column({ type: 'varchar' })
  created_at: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: string;

  @OneToOne(
    type => ClipReactionStats,
    clipReactionStats => clipReactionStats.clip,
  )
  @JoinColumn()
  reactionStats: ClipReactionStats;

  @Column({ type: 'uuid' })
  reactionStatsId: string;

  @OneToMany(type => ClipReaction, clipReaction => clipReaction.clip)
  reactions: ClipReaction[];

  @OneToMany(type => CommunityClip, communityClip => communityClip.clip)
  communityClips: CommunityClip[];

  @OneToMany(
    type => ClipCollectionClip,
    clipCollectionClip => clipCollectionClip.clip,
  )
  collectionClips: ClipCollectionClip[];

  @OneToMany(type => ClipHistory, clipHistory => clipHistory.clip)
  history: ClipHistory[];

  @OneToMany(type => ClipComment, clipComment => clipComment.clip)
  comments: ClipComment[];

  @ManyToOne(type => Channel, channel => channel.id)
  @JoinColumn({ name: 'broadcaster_id' })
  channel: Channel;
}
