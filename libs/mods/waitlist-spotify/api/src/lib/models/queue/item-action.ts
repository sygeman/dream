import { registerEnumType } from '@nestjs/graphql';

export enum ModeWaitlistSpotifyQueueItemAction {
  CANCEL,
}

registerEnumType(ModeWaitlistSpotifyQueueItemAction, {
  name: 'ModeWaitlistSpotifyQueueItemAction',
});
