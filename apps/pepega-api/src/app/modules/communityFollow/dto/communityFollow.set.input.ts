import { Field, InputType } from 'type-graphql';

@InputType()
export class SetCommunityFollowInput {
  @Field()
  communityId: string;

  @Field({ nullable: true })
  userId?: string;

  @Field()
  follow: boolean;
}
