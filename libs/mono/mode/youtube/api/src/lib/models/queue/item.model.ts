import { Field, ObjectType } from '@nestjs/graphql';
import { YoutubeModeQueueItemAction } from './item-action';
import { YoutubeModeQueueItemData } from './item-data.model';

@ObjectType()
export class YoutubeModeQueueItem {
  @Field(() => [YoutubeModeQueueItemAction])
  actions: YoutubeModeQueueItemAction[];

  @Field(() => YoutubeModeQueueItemData)
  data: YoutubeModeQueueItemData;
}
