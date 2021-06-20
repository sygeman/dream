import { registerEnumType } from '@nestjs/graphql';

export enum SpotifyModeQueueAction {
  ADD_TRACK,
}

registerEnumType(SpotifyModeQueueAction, {
  name: 'SpotifyModeQueueAction',
});
