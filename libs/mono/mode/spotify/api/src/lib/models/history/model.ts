import { Field, ObjectType } from '@nestjs/graphql';
// import { SpotifyModeHistoryAction } from './action';
import { SpotifyModeHistoryItem } from './item.model';

@ObjectType()
export class SpotifyModeHistory {
  // @Field(() => [SpotifyModeHistoryAction])
  // actions: SpotifyModeHistoryAction[];

  @Field(() => [SpotifyModeHistoryItem])
  items: SpotifyModeHistoryItem[];
}
