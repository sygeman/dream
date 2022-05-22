import { IsOptional, Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class CommunityClipCreateInput {
  @Field()
  communityId: string;

  @Field()
  clipId: string;

  @Field({ nullable: true })
  @IsOptional()
  @Length(2, 100)
  title?: string;

  @Field({ nullable: true, defaultValue: false })
  @IsOptional()
  nfws?: boolean;

  @Field({ nullable: true, defaultValue: false })
  @IsOptional()
  spoiler?: boolean;
}
