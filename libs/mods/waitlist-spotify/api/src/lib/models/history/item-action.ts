import { registerEnumType } from '@nestjs/graphql';

export enum ModeWaitlistSpotifyHistoryItemAction {
  ADD_TO_QUEUE,
}

registerEnumType(ModeWaitlistSpotifyHistoryItemAction, {
  name: 'ModeWaitlistSpotifyHistoryItemAction',
});
