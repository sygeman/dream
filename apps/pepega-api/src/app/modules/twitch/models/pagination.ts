import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class TwitchPagination {
  @Field({ nullable: true }) 'cursor': string;
}
