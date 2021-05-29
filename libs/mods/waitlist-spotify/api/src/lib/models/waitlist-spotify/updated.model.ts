import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ModeWaitlistSpotifyUpdated {
  @Field()
  channelName: string;
}
