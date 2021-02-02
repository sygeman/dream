import { Field, Int, ObjectType } from 'type-graphql';

@ObjectType()
export class ChannelPromoter {
  @Field()
  id: string;

  @Field()
  uniqKey: string;

  @Field()
  active: boolean;

  @Field(type => Int)
  cost: number;

  @Field()
  channelId: string;

  @Field()
  userId: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
