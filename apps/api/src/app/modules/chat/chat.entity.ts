import {
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ChatMessage } from './chatMessage.entity';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: string;

  @OneToMany(type => ChatMessage, chatMessage => chatMessage.chat)
  messages: ChatMessage[];
}
