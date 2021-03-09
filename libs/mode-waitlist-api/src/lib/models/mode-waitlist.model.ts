import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ModeWaitlist {
  @Field()
  id: string;

  @Field({ nullable: true })
  trackId: string;

  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  artists: string;

  @Field({ nullable: true })
  cover: string;

  @Field(() => Int, { nullable: true })
  duration: number;

  @Field(() => String, { nullable: true })
  start: string;
}
