import { Field, ObjectType } from '@nestjs/graphql';
import { ModeWaitlistYoutubeHistoryItemAction } from './item-action';
import { ModeWaitlistYoutubeHistoryItemData } from './item-data.model';

@ObjectType()
export class ModeWaitlistYoutubeHistoryItem {
  @Field(() => [ModeWaitlistYoutubeHistoryItemAction])
  actions: ModeWaitlistYoutubeHistoryItemAction[];

  @Field(() => ModeWaitlistYoutubeHistoryItemData)
  data: ModeWaitlistYoutubeHistoryItemData;
}
