import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class TwitchFollowData {
  @Field() 'from_id': string;
  @Field() 'from_name': string;
  @Field() 'to_id': string;
  @Field() 'to_name': string;
  @Field() 'followed_at': string;
}
