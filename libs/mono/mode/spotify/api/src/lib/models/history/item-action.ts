import { registerEnumType } from '@nestjs/graphql';

export enum SpotifyModeHistoryItemAction {
  ADD_TO_QUEUE,
}

registerEnumType(SpotifyModeHistoryItemAction, {
  name: 'SpotifyModeHistoryItemAction',
});
