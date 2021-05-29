import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ModeWaitlistSpotifyTrack } from './waitlist-spotify-track.model';

@ObjectType()
export class ModeWaitlistSpotifyItem {
  @Field()
  id: string;

  @Field(() => Int, { nullable: true, defaultValue: 0 })
  duration: number;

  @Field(() => Int, { nullable: true, defaultValue: 0 })
  start: number;

  @Field(() => Int, { nullable: true, defaultValue: 0 })
  end: number;

  @Field(() => Boolean, { nullable: true, defaultValue: false })
  skipped: boolean;

  @Field(() => Boolean, { nullable: true, defaultValue: false })
  canceled: boolean;

  @Field(() => ModeWaitlistSpotifyTrack, { nullable: true })
  track: ModeWaitlistSpotifyTrack;

  @Field({ nullable: true }) trackId: string;

  // channel             Channel?                  @relation(fields: [channelId], references: [id])
  // channelId           String?
  // author              User?                     @relation(fields: [authorId], references: [id])
  @Field({ nullable: true }) authorId: string;

  @Field({ nullable: true }) startedAt: string;
  @Field({ nullable: true }) endedAt: string;

  @Field() createdAt: string;
  @Field() updatedAt: string;
}
