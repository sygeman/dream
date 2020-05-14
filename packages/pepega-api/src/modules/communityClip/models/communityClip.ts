import { Field, ObjectType } from 'type-graphql';
import { Clip } from '../../clip/models/clip';

@ObjectType()
export class CommunityClip {
  @Field()
  id: string;

  @Field()
  communityId: string;

  @Field()
  clipId: string;

  @Field()
  title: string;

  @Field()
  approved: boolean;

  @Field()
  nfws: boolean;

  @Field()
  spoiler: boolean;

  @Field()
  authorId: string;

  @Field()
  deleted: boolean;

  @Field()
  createdAt: string;

  @Field()
  updatedAt: string;
}
