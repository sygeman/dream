import { Field, Int, ObjectType } from '@nestjs/graphql';
import { SpotifyModeHistoryItemDataAuthor } from './item-data-author.model';

@ObjectType()
export class SpotifyModeHistoryItemData {
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

  @Field({ nullable: true })
  startedAt?: string;

  @Field({ nullable: true })
  endedAt?: string;

  @Field(() => SpotifyModeHistoryItemDataAuthor)
  author: SpotifyModeHistoryItemDataAuthor;
}
