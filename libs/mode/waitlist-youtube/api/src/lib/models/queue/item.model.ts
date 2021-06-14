import { Field, ObjectType } from '@nestjs/graphql';
import { ModeWaitlistYoutubeQueueItemAction } from './item-action';
import { ModeWaitlistYoutubeQueueItemData } from './item-data.model';

@ObjectType()
export class ModeWaitlistYoutubeQueueItem {
  @Field(() => [ModeWaitlistYoutubeQueueItemAction])
  actions: ModeWaitlistYoutubeQueueItemAction[];

  @Field(() => ModeWaitlistYoutubeQueueItemData)
  data: ModeWaitlistYoutubeQueueItemData;
}
