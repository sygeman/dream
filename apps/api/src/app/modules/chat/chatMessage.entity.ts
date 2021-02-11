import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Chat } from './chat.entity';
import { User } from '../user/user.entity';

@Entity()
export class ChatMessage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  content: string;

  @Column({ type: 'uuid' })
  chatId: string;

  @ManyToOne(type => Chat, chat => chat.messages)
  chat: Chat;

  @Column({ type: 'uuid' })
  authorId: string;

  @ManyToOne(type => User, user => user.chatMessages)
  @JoinColumn({ name: 'authorId' })
  author: User;

  @Column({ type: 'boolean', nullable: true, default: false })
  deleted: boolean;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: string;
}
