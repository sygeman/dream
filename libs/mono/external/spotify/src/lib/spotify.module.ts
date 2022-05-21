import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PrismaModule } from '@dream/mono-prisma';
import { SpotifyResolver } from './spotify.resolver';
import { SpotifyService } from './spotify.service';

@Module({
  imports: [PrismaModule, HttpModule],
  providers: [SpotifyResolver, SpotifyService],
  exports: [SpotifyService],
})
export class SpotifyModule {}
