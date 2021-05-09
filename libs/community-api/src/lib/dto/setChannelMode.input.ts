import { Field, ID, InputType } from '@nestjs/graphql';
import { ChannelMode } from '@prisma/client';

@InputType()
export class SetChannelModeInput {
  @Field(() => ID)
  channelId: string;

  @Field(() => ChannelMode)
  mode: ChannelMode;
}
