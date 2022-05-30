import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProjectState {
  @Field()
  id: string;

  @Field()
  count: number;

  @Field()
  createdAt: string;

  @Field()
  updatedAt: string;
}
