import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ModeWaitlistSpotifyQueueItemDataAuthor } from './item-data-author.model';

@ObjectType()
export class ModeWaitlistSpotifyQueueItemData {
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

  @Field(() => ModeWaitlistSpotifyQueueItemDataAuthor)
  author: ModeWaitlistSpotifyQueueItemDataAuthor;
}
