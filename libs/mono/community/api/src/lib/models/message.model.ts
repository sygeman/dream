import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '@dream/mono-user-api';

@ObjectType()
export class TenorGif {
  @Field()
  id: string;

  @Field()
  height: number;

  @Field()
  width: number;

  @Field()
  preview: string;

  @Field()
  video: string;
}

@ObjectType()
export class ChannelMessage {
  @Field() id: string;

  @Field() content: string;

  @Field() channelId: string;

  @Field() userId: string;

  @Field(() => User) user: User;

  @Field() createdAt: string;

  @Field(() => TenorGif, { nullable: true })
  tenorGif?: TenorGif;
}
