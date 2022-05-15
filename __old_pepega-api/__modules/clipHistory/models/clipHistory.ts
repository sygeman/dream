import { Field, ObjectType } from 'type-graphql';
// import { User } from '../../user/models/user';

@ObjectType()
export class ClipHistory {
  @Field() id: string;

  @Field() clipId: string;

  @Field() userId: string;

  @Field() createdAt: string;
}
