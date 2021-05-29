import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ModeWaitlistSpotifyTrack {
  @Field()
  id: string;

  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  artists: string;

  @Field({ nullable: true })
  cover: string;

  @Field(() => Int, { nullable: true })
  duration: number;
}
