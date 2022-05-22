import { Field, Int, ObjectType } from 'type-graphql';

@ObjectType()
export class ClipReactionStats {
  @Field() id: string;

  @Field() clipId: string;

  @Field(type => Int) likes: number;

  @Field(type => Int) dislikes: number;

  @Field(type => Int) rating: number;

  @Field() userId: string;

  @Field() createdAt: string;
}
