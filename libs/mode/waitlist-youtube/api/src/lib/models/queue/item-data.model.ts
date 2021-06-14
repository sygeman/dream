import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ModeWaitlistYoutubeQueueItemDataAuthor } from './item-data-author.model';

@ObjectType()
export class ModeWaitlistYoutubeQueueItemData {
  @Field()
  id: string;

  @Field()
  videoId: string;

  @Field(() => Int)
  duration: number;

  @Field()
  cover: string;

  @Field()
  artists: string;

  @Field()
  title: string;

  @Field(() => ModeWaitlistYoutubeQueueItemDataAuthor)
  author: ModeWaitlistYoutubeQueueItemDataAuthor;
}
