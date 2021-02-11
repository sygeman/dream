import { Strategy } from 'passport-vkontakte';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ProfilePayload } from '../../profile/types/ProfilePayload';

@Injectable()
export class VKStrategy extends PassportStrategy(Strategy, 'vkontakte') {
  constructor(private readonly config: ConfigService) {
    super(config.get('authVK'));
  }

  async validate(a, r, profile): Promise<ProfilePayload> {
    return {
      serviceId: profile.id,
      serviceName: 'vkontakte',
      name: profile.displayName,
      avatar: profile._json.photo
    };
  }
}
