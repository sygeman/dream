import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Repository,
  FindOneOptions,
  FindManyOptions,
  FindConditions,
} from 'typeorm';

import { Chat } from './chat.entity';
import { ChatMessage } from './chatMessage.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private readonly chatRepository: Repository<Chat>,
    @InjectRepository(ChatMessage)
    private readonly chatMessageRepository: Repository<ChatMessage>,
  ) {}

  async count(findOptions: FindOneOptions<Chat>) {
    return await this.chatRepository.count(findOptions);
  }

  async findOne(findOptions: FindOneOptions<Chat>) {
    return await this.chatRepository.findOne(findOptions);
  }

  async find(findOptions: FindManyOptions<Chat>) {
    return await this.chatRepository.find(findOptions);
  }

  async create(payload) {
    const newMessage = new Chat();

    Object.keys(payload).forEach(key => {
      newMessage[key] = payload[key];
    });

    return this.chatRepository.save(newMessage);
  }

  async remove(findOptions: FindConditions<Chat>) {
    return this.chatRepository.delete(findOptions);
  }

  async update(findOptions: FindConditions<Chat>, data: any) {
    return this.chatRepository.update(findOptions, data);
  }

  async countMessages(findOptions: FindOneOptions<ChatMessage>) {
    return await this.chatMessageRepository.count(findOptions);
  }

  async findOneMessage(findOptions: FindOneOptions<ChatMessage>) {
    return await this.chatMessageRepository.findOne(findOptions);
  }

  async findMessages(findOptions: FindManyOptions<ChatMessage>) {
    return await this.chatMessageRepository.find(findOptions);
  }

  async createMessage(payload) {
    const newMessage = new ChatMessage();

    Object.keys(payload).forEach(key => {
      newMessage[key] = payload[key];
    });

    return this.chatMessageRepository.save(newMessage);
  }

  async removeMessages(findOptions: FindConditions<ChatMessage>) {
    return this.chatMessageRepository.delete(findOptions);
  }

  async updateMessages(findOptions: FindConditions<ChatMessage>, data: any) {
    return this.chatMessageRepository.update(findOptions, data);
  }
}
