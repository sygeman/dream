import { HttpModule, Module } from '@nestjs/common';
import { PrismaModule } from '@dream/prisma';
import { SpotifyResolver } from './spotify.resolver';
import { SpotifyService } from './spotify.service';

@Module({
  imports: [PrismaModule, HttpModule],
  providers: [SpotifyResolver, SpotifyService],
  exports: [SpotifyService],
})
export class SpotifyModule {}
