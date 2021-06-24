import { Field, ID, InputType } from '@nestjs/graphql';
import { SpotifyModeStrategy } from '@prisma/client';

@InputType()
export class UpdateSpotifyModeInput {
  @Field(() => ID)
  channelId: string;

  @Field(() => SpotifyModeStrategy)
  strategy: SpotifyModeStrategy;
}
