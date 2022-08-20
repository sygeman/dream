import { Field, ObjectType } from '@nestjs/graphql';
import { SpotifyModeHistoryItemAction } from './item-action';
import { SpotifyModeHistoryItemData } from './item-data.model';

@ObjectType()
export class SpotifyModeHistoryItem {
  @Field(() => [SpotifyModeHistoryItemAction])
  actions: SpotifyModeHistoryItemAction[];

  @Field(() => SpotifyModeHistoryItemData)
  data: SpotifyModeHistoryItemData;
}
