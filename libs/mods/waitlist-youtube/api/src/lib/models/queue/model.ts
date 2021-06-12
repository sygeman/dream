import { Field, ObjectType } from '@nestjs/graphql';
import { ModeWaitlistYoutubeQueueAction } from './action';
import { ModeWaitlistYoutubeQueueItem } from './item.model';

@ObjectType()
export class ModeWaitlistYoutubeQueue {
  @Field(() => [ModeWaitlistYoutubeQueueAction])
  actions: ModeWaitlistYoutubeQueueAction[];

  @Field(() => [ModeWaitlistYoutubeQueueItem])
  items: ModeWaitlistYoutubeQueueItem[];
}
