import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Community {
  @Field() id: string;

  @Field() name: string;

  @Field({ nullable: true }) description: string;

  @Field({ nullable: true }) avatar: string;

  @Field() mainChatId: string;

  @Field() createdAt: string;

  @Field() costCreateClip: number;
}
