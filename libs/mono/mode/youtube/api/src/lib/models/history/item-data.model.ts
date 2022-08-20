import { Field, Int, ObjectType } from '@nestjs/graphql';
import { YoutubeModeHistoryItemDataAuthor } from './item-data-author.model';

@ObjectType()
export class YoutubeModeHistoryItemData {
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

  @Field(() => YoutubeModeHistoryItemDataAuthor)
  author: YoutubeModeHistoryItemDataAuthor;
}
