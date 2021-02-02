import { Module } from '@nestjs/common';
import { PrismaModule } from '@pepega/prisma';
import { ChatService } from './chat.service';
import { ChatResolver } from './chat.resolver';

@Module({
  imports: [PrismaModule],
  providers: [ChatService, ChatResolver],
  exports: [ChatService],
})
export class ChatModule {}
