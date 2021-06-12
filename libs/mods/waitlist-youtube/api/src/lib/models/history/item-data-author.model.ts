import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ModeWaitlistYoutubeHistoryItemDataAuthor {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  avatar?: string;
}
