import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Project {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  alias?: string;

  @Field({ nullable: true })
  stateId?: string;

  @Field()
  createdAt: string;

  @Field()
  updatedAt: string;
}
