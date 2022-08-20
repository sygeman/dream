import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CommunitySettings {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  avatar?: string;
}
