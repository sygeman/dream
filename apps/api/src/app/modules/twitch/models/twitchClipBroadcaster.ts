import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TwitchClipBroadcaster {
  @Field() id: string;
  @Field() name: string;
  @Field() display_name: string;
  @Field() channel_url: string;
  @Field() logo: string;
}
