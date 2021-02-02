import { Field, Int, ObjectType } from 'type-graphql';

@ObjectType()
export class ConnectionsCount {
  @Field(type => Int)
  unique: number;

  @Field(type => Int)
  users: number;
}
