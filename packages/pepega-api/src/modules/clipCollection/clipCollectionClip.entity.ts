import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Clip } from '../clip/clip.entity';
import { ClipCollection } from './clipCollection.entity';

@Entity()
export class ClipCollectionClip {
  @PrimaryColumn('varchar')
  id: string;

  @Column({ type: 'uuid' })
  clipCollectionId: string;

  @ManyToOne(type => ClipCollection, clipCollection => clipCollection.id)
  @JoinColumn({ name: 'clipCollectionId' })
  clipCollection: ClipCollection;

  @Column()
  clipId: string;

  @ManyToOne(type => Clip, clip => clip.collectionClips)
  clip: Clip;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: string;
}
