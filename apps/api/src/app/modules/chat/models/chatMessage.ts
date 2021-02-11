import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../user/models/user';

@ObjectType()
export class ChatMessage {
  @Field() id: string;

  @Field() content: string;

  @Field() chatId: string;

  @Field() authorId: string;

  @Field((type) => User) author: User;

  @Field() createdAt: string;
}
