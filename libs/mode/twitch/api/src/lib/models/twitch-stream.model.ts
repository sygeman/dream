import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TwitchStream {
  @Field()
  id: string;

  @Field({ nullable: true })
  channelKey?: string;
}
