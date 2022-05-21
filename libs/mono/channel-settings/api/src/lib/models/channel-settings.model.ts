import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { ChannelMode } from '@prisma/mono';

registerEnumType(ChannelMode, {
  name: 'ChannelMode',
});

@ObjectType()
export class ChannelSettings {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  title: string;

  @Field(() => ChannelMode)
  mode: ChannelMode;

  @Field(() => Boolean)
  gifAllowed: boolean;

  @Field(() => Boolean)
  nsfw: boolean;

  @Field(() => Int)
  slowmode: number;

  @Field({ nullable: true })
  avatar?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
