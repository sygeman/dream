import { ValidateNested, IsOptional } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class ChannelPromoterWhereUniqueInput {
  @Field({ nullable: true })
  @IsOptional()
  @ValidateNested()
  id: string;
}
