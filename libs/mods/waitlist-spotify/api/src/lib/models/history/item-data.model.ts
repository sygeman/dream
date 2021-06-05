import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ModeWaitlistSpotifyHistoryItemDataAuthor } from './item-data-author.model';

@ObjectType()
export class ModeWaitlistSpotifyHistoryItemData {
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

  @Field(() => ModeWaitlistSpotifyHistoryItemDataAuthor)
  author: ModeWaitlistSpotifyHistoryItemDataAuthor;
}
