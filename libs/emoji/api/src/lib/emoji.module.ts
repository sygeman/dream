import { PrismaModule } from '@dream/prisma';
import { Module } from '@nestjs/common';
import { EmojiController } from './emoji.controller';
import { EmojiResolver } from './emoji.resolver';

@Module({
  imports: [PrismaModule],
  controllers: [EmojiController],
  providers: [EmojiResolver],
})
export class EmojiModule {}
