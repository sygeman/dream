import { Field, ObjectType } from 'type-graphql';
import { User } from '../../user/models/user';

@ObjectType()
export class ClipComment {
  @Field() id: string;

  @Field() content: string;

  @Field() authorId: string;

  @Field(type => User) author: User;

  @Field() clipId: string;

  @Field() createdAt: string;
}
