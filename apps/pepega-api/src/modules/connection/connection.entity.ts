import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

import { User } from '../user/user.entity';

@Entity()
export class Connection {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: true })
  instanceId: string;

  @Column({ type: 'varchar', nullable: true })
  ip: string;

  @Column({ type: 'uuid', nullable: true })
  userId: string;

  @ManyToOne(type => User, user => user.connections)
  user: User;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: string;
}
