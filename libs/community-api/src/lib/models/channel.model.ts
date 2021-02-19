import { Field, ObjectType } from '@nestjs/graphql';

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
