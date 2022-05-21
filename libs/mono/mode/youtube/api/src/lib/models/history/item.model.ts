import { Field, ObjectType } from '@nestjs/graphql';
import { YoutubeModeHistoryItemAction } from './item-action';
import { YoutubeModeHistoryItemData } from './item-data.model';

@ObjectType()
export class YoutubeModeHistoryItem {
  @Field(() => [YoutubeModeHistoryItemAction])
  actions: YoutubeModeHistoryItemAction[];

  @Field(() => YoutubeModeHistoryItemData)
  data: YoutubeModeHistoryItemData;
}
