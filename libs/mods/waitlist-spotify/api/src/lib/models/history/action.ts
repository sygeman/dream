import { registerEnumType } from '@nestjs/graphql';

export enum ModeWaitlistSpotifyHistoryAction {
  ADD_TRACK,
}

registerEnumType(ModeWaitlistSpotifyHistoryAction, {
  name: 'ModeWaitlistSpotifyHistoryAction',
});
