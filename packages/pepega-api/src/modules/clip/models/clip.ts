import { Field, ObjectType, Int } from 'type-graphql';
import { ClipReactionStats } from '../../clipReaction/models/clipReactionStats';
import { Channel } from '../../channel/models/channel';
import { CommunityClip } from '../../communityClip/models/communityClip';
import { ClipHistory } from '../../clipHistory/models/clipHistory';

@ObjectType()
export class Clip {
  @Field()
  id: string;

  @Field()
  sourceUrl: string;

  @Field()
  title: string;

  @Field()
  thumbnail_url: string;

  @Field()
  language: string;

  @Field()
  broadcaster_id: string;

  @Field()
  creator_id: string;

  @Field()
  video_id: string;

  @Field()
  game_id: string;

  @Field()
  created_at: string;

  @Field()
  createdAt: string;

  @Field()
  updatedAt: string;

  @Field()
  watched: boolean;

  @Field(type => ClipReactionStats)
  reactionStats: ClipReactionStats;

  @Field(type => Channel)
  channel: Channel;

  @Field(type => [CommunityClip])
  communityClips: CommunityClip[];
}
