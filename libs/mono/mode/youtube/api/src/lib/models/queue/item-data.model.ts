import { Field, Int, ObjectType } from '@nestjs/graphql';
import { YoutubeModeQueueItemDataAuthor } from './item-data-author.model';

@ObjectType()
export class YoutubeModeQueueItemData {
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

  @Field(() => YoutubeModeQueueItemDataAuthor)
  author: YoutubeModeQueueItemDataAuthor;
}
