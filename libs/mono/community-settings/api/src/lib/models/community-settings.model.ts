import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CommunitySettings {
  @Field()
  id: string;

  @Field({ nullable: true })
  name?: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  avatar?: string;
}
