import { Field, InputType } from '@nestjs/graphql';
import { Length } from 'class-validator';

@InputType()
export class ChannelMessageCreateInput {
  @Field()
  @Length(1, 500)
  content: string;

  @Field()
  channelId: string;
}
