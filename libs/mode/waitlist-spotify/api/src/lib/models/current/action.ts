import { registerEnumType } from '@nestjs/graphql';

export enum ModeWaitlistSpotifyCurrentAction {
  SKIP,
}

registerEnumType(ModeWaitlistSpotifyCurrentAction, {
  name: 'ModeWaitlistSpotifyCurrentAction',
});
