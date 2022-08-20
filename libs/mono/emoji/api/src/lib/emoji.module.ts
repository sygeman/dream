import { AuthModule } from '@dream/mono-auth-api';
import { PrismaModule } from '@dream/mono-prisma';
import { Module } from '@nestjs/common';
import { EmojiController } from './emoji.controller';
import { EmojiResolver } from './emoji.resolver';

@Module({
  imports: [AuthModule, PrismaModule],
  controllers: [EmojiController],
  providers: [EmojiResolver],
})
export class EmojiModule {}
