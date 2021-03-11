import { HttpModule, Module } from '@nestjs/common';
import { PrismaModule } from '@dream/prisma';
import { SpotifyResolver } from './spotify.resolver';

@Module({
  imports: [PrismaModule, HttpModule],
  controllers: [],
  providers: [SpotifyResolver],
  exports: [],
})
export class SpotifyModule {}
