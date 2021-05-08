import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@dream/auth-api';
import { SpotifyService } from './spotify.service';
import { SpotifyNow } from './models/spotify-now.model';

@Resolver()
export class SpotifyResolver {
  constructor(private readonly spotifyService: SpotifyService) {}

  @Query(() => SpotifyNow, { nullable: true })
  async spotifyNow(@Args('token') token: string): Promise<SpotifyNow> {
    // Find userId by token
    const userId = 'ckof0hq3c12216386mhg8imq4o';

    const current = (await this.spotifyService.getMePlayer(userId))?.data;

    if (!current) return null;

    let progress = 0;

    if (current) {
      progress = current?.progress_ms / current?.item?.duration_ms;
    }

    const id = current?.item?.id;
    const name = current?.item?.name;
    const artist = (current?.item?.artists || [])
      .map((artist) => artist?.name)
      .join(', ');
    const images = current?.item?.album?.images || [];

    return {
      id,
      imageUrl: images[images.length - 1]?.url,
      artist: artist,
      name: name,
      progress: progress,
    };
  }

  @UseGuards(AuthGuard)
  @Query(() => String)
  spotifyToken(@Context('userId') userId): Promise<string> {
    return this.spotifyService.getToken(userId);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => String)
  refreshSpotifyToken(@Context('userId') userId) {
    return this.spotifyService.refreshToken(userId);
  }
}
