import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ConnectionsCount {
  @Field((type) => Int)
  unique: number;

  @Field((type) => Int)
  users: number;
}
