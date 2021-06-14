import { Field, ObjectType } from '@nestjs/graphql';
// import { ModeWaitlistYoutubeHistoryAction } from './action';
import { ModeWaitlistYoutubeHistoryItem } from './item.model';

@ObjectType()
export class ModeWaitlistYoutubeHistory {
  // @Field(() => [ModeWaitlistYoutubeHistoryAction])
  // actions: ModeWaitlistYoutubeHistoryAction[];

  @Field(() => [ModeWaitlistYoutubeHistoryItem])
  items: ModeWaitlistYoutubeHistoryItem[];
}
