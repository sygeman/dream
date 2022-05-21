import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { Length } from 'class-validator';

@InputType()
export class UpdateChannelSettingsInput {
  @Field(() => ID)
  channelId: string;

  @Field(() => ID)
  communityId: string;

  @Field({ nullable: true })
  @Length(1, 50)
  name?: string;

  @Field(() => Boolean, { nullable: true })
  gifAllowed?: boolean;

  @Field(() => Boolean, { nullable: true })
  nsfw?: boolean;

  @Field(() => Int, { nullable: true })
  slowmode?: number;

  @Field({ nullable: true })
  @Length(1, 50)
  title?: string;
}
