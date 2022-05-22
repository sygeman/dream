import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ClipHistory {
  @Field()
  id: string;

  @Field()
  userId: string;

  @Field()
  clipId: string;

  @Field()
  count: number;

  @Field()
  createdAt: string;

  @Field()
  updatedAt: string;
}
