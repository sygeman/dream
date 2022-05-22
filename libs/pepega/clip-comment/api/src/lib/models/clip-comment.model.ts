import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ClipComment {
  @Field()
  id: string;

  @Field()
  userId: string;

  @Field()
  clipId: string;

  @Field()
  content: string;

  @Field()
  createdAt: string;

  @Field()
  updatedAt: string;
}
