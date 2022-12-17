import { AuthModule } from '@dream/mono-auth-api';
import { PrismaModule } from '@dream/mono-prisma';
import { Module } from '@nestjs/common';
import { EmojiResolver } from './emoji.resolver';

@Module({
  imports: [AuthModule, PrismaModule],
  providers: [EmojiResolver],
})
export class EmojiModule {}
