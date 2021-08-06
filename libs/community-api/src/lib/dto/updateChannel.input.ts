import { Field, ID, InputType } from '@nestjs/graphql';
import { Length } from 'class-validator';

@InputType()
export class UpdateChannelInput {
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

  @Field({ nullable: true })
  @Length(1, 50)
  title?: string;
}
