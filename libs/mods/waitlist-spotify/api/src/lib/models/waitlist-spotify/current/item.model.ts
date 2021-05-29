import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ModeWaitlistSpotifyCurrentItemAuthor } from './item-author.model';

@ObjectType()
export class ModeWaitlistSpotifyCurrentItem {
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
  startedAt: string;

  @Field(() => ModeWaitlistSpotifyCurrentItemAuthor)
  author: ModeWaitlistSpotifyCurrentItemAuthor;
}
