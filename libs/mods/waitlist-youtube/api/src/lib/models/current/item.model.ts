import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ModeWaitlistYoutubeCurrentItemAuthor } from './item-author.model';

@ObjectType()
export class ModeWaitlistYoutubeCurrentItem {
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
  startedAt: string;

  @Field(() => ModeWaitlistYoutubeCurrentItemAuthor)
  author: ModeWaitlistYoutubeCurrentItemAuthor;
}
