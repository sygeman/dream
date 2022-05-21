import { registerEnumType } from '@nestjs/graphql';

export enum SpotifyModeHistoryAction {
  ADD_TRACK,
}

registerEnumType(SpotifyModeHistoryAction, {
  name: 'SpotifyModeHistoryAction',
});
