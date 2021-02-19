import { Args, Context, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from '@dream/prisma';
import { User } from './models/user.model';
import { HttpService, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@dream/auth-api';
import { ConfigService } from '@nestjs/config';
import * as querystring from 'querystring';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private prisma: PrismaService,
    private httpService: HttpService,
    private readonly config: ConfigService
  ) {}

  @Query(() => User, { nullable: true })
  async user(
    @Args({ name: 'id', type: () => ID, nullable: true })
    id: string,
    @Context('userId') userId
  ) {
    if (!id) {
      if (!userId) return null;
      id = userId;
    }

    return this.prisma.user.findFirst({
      where: { id },
      include: { profiles: true },
    });
  }

  @UseGuards(AuthGuard)
  @Query(() => User)
  me(@Context('userId') userId): Promise<User> {
    return this.prisma.user.findFirst({
      where: { id: userId },
      include: {
        profiles: true,
      },
    });
  }

  @UseGuards(AuthGuard)
  @Query(() => String)
  async spotifyToken(@Context('userId') userId): Promise<string> {
    const profile = await this.prisma.profile.findFirst({
      where: { userId },
    });

    return profile?.accessToken || '';
  }

  @UseGuards(AuthGuard)
  @Mutation(() => String)
  async refreshSpotifyToken(@Context('userId') userId) {
    const profile = await this.prisma.profile.findFirst({
      where: { userId, provider: 'spotify' },
    });

    const { refreshToken } = profile;

    const { clientID, clientSecret } = this.config.get('authSpotify');
    const token = Buffer.from(clientID + ':' + clientSecret).toString('base64');

    const res = await this.httpService
      .post(
        'https://accounts.spotify.com/api/token',
        querystring.stringify({
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
        }),
        {
          headers: {
            // <base64 encoded client_id:client_secret>
            Authorization: `Basic ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      )
      .toPromise();

    const accessToken = res?.data?.access_token;

    if (!accessToken) {
      throw new Error('fail');
    }

    await this.prisma.profile.update({
      where: {
        id: profile.id,
      },
      data: {
        accessToken,
      },
    });

    return accessToken;
  }
}
