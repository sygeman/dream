import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { ChannelMode } from '@prisma/client';

registerEnumType(ChannelMode, {
  name: 'ChannelMode',
});

@ObjectType()
export class Channel {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  state?: string;

  @Field(() => ChannelMode)
  mode: ChannelMode;

  @Field(() => Boolean)
  gifAllowed: boolean;

  @Field(() => Boolean)
  nsfw: boolean;

  @Field({ nullable: true })
  avatar?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field()
  onlineCount: number;

  // @Field(() => Profile, { nullable: true })
  // profile?: Profile;
}
