import { AuthModule } from '@dream/auth-api';
import { PrismaModule } from '@dream/prisma/mono';
import { Module } from '@nestjs/common';
import { EmojiController } from './emoji.controller';
import { EmojiResolver } from './emoji.resolver';

@Module({
  imports: [AuthModule, PrismaModule],
  controllers: [EmojiController],
  providers: [EmojiResolver],
})
export class EmojiModule {}
