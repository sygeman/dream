import { Field, Int, ObjectType } from '@nestjs/graphql';
import { SpotifyModeQueueItemDataAuthor } from './item-data-author.model';

@ObjectType()
export class SpotifyModeQueueItemData {
  @Field()
  id: string;

  @Field()
  trackId: string;

  @Field(() => Int)
  duration: number;

  @Field()
  cover: string;

  @Field()
  artists: string;

  @Field()
  title: string;

  @Field(() => SpotifyModeQueueItemDataAuthor)
  author: SpotifyModeQueueItemDataAuthor;
}
