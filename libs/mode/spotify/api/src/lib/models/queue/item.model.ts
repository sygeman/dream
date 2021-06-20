import { Field, ObjectType } from '@nestjs/graphql';
import { SpotifyModeQueueItemAction } from './item-action';
import { SpotifyModeQueueItemData } from './item-data.model';

@ObjectType()
export class SpotifyModeQueueItem {
  @Field(() => [SpotifyModeQueueItemAction])
  actions: SpotifyModeQueueItemAction[];

  @Field(() => SpotifyModeQueueItemData)
  data: SpotifyModeQueueItemData;
}
