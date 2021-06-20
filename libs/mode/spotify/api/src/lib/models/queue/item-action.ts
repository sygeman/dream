import { registerEnumType } from '@nestjs/graphql';

export enum SpotifyModeQueueItemAction {
  CANCEL,
}

registerEnumType(SpotifyModeQueueItemAction, {
  name: 'SpotifyModeQueueItemAction',
});
