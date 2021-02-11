import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CommunityFollow {
  @Field()
  id: string;

  @Field()
  communityId: string;

  @Field()
  userId: string;

  @Field()
  follow: boolean;

  @Field()
  createdAt: string;

  @Field()
  updatedAt: string;
}
