import { ValidateNested, IsOptional } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class ChannelWhereUniqueInput {
  @Field({ nullable: true })
  @IsOptional()
  @ValidateNested()
  id: string;
}
