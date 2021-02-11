import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TwitchPagination {
  @Field({ nullable: true }) 'cursor': string;
}
