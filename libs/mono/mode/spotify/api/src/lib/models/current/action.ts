import { registerEnumType } from '@nestjs/graphql';

export enum SpotifyModeCurrentAction {
  SKIP,
}

registerEnumType(SpotifyModeCurrentAction, {
  name: 'SpotifyModeCurrentAction',
});
