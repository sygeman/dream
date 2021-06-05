import { registerEnumType } from '@nestjs/graphql';

export enum ModeWaitlistSpotifyQueueAction {
  ADD_TRACK,
}

registerEnumType(ModeWaitlistSpotifyQueueAction, {
  name: 'ModeWaitlistSpotifyQueueAction',
});
