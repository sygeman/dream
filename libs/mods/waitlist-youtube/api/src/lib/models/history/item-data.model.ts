import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ModeWaitlistYoutubeHistoryItemDataAuthor } from './item-data-author.model';

@ObjectType()
export class ModeWaitlistYoutubeHistoryItemData {
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

  @Field({ nullable: true })
  startedAt?: string;

  @Field({ nullable: true })
  endedAt?: string;

  @Field(() => ModeWaitlistYoutubeHistoryItemDataAuthor)
  author: ModeWaitlistYoutubeHistoryItemDataAuthor;
}
