import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './chat.entity';
import { ChatMessage } from './chatMessage.entity';
import { ChatService } from './chat.service';
import { ChatMessageResolver } from './chatMessage.resolver';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Chat, ChatMessage]), UserModule],
  providers: [ChatService, ChatMessageResolver],
  exports: [ChatService],
})
export class ChatModule {}
