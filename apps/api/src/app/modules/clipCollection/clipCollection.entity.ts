import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { User } from '../user/user.entity';

@Entity()
export class ClipCollection {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'uuid' })
  authorId: string;

  @ManyToOne(type => User, user => user.id)
  @JoinColumn({ name: 'authorId' })
  author: User;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: string;
}
