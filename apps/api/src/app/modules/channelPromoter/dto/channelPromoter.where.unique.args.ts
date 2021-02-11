import { ValidateNested, IsOptional } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ChannelPromoterWhereUniqueInput {
  @Field({ nullable: true })
  @IsOptional()
  @ValidateNested()
  id: string;
}
