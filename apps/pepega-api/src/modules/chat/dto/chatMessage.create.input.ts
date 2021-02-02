import { IsOptional, Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class ChatMessageCreateInput {
  @Field()
  @Length(1, 500)
  text: string;

  @Field()
  chatId: string;
}
