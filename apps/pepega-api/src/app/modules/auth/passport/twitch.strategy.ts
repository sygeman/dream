import { Strategy } from 'passport-twitch-new';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TwitchStrategy extends PassportStrategy(Strategy, 'twitch') {
  constructor(private readonly config: ConfigService) {
    super(config.get('authTwitch'));
  }

  async validate(accessToken, refreshToken, profile) {
    return {
      accessToken,
      refreshToken,
      provider: 'twitch',
      serviceId: profile?.id,
      name: profile?.display_name,
      email: profile?.email,
      avatar: profile?.profile_image_url,
    };
  }
}
