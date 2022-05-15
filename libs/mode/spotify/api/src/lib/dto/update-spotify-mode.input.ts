import { Field, ID, InputType } from '@nestjs/graphql';
import { SpotifyModeStrategy } from '@prisma/mono';

@InputType()
export class UpdateSpotifyModeInput {
  @Field(() => ID)
  channelId: string;

  @Field(() => SpotifyModeStrategy)
  strategy: SpotifyModeStrategy;
}
