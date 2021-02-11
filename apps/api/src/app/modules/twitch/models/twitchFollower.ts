import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TwitchFollower {
  @Field() title: string;

  @Field() name: string;
}
