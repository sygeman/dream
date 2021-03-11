import { Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@dream/auth-api';
import { SpotifyService } from './spotify.service';

@Resolver()
export class SpotifyResolver {
  constructor(private readonly spotifyService: SpotifyService) {}

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
