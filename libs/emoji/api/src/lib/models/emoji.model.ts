import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '@dream/user-api';

@ObjectType()
export class Emoji {
  @Field()
  id: string;

  @Field()
  alias: string;

  @Field()
  communityId: string;

  @Field()
  authorId: string;

  @Field(() => User)
  author: User;

  @Field()
  createdAt: string;
}
