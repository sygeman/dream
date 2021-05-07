import { Field, InputType } from '@nestjs/graphql';
import { IsLowercase, IsString, Length, Matches } from 'class-validator';
import { urlNameRegExp } from '@dream/utils/regexp';

@InputType()
export class CreateCommunityInput {
  @Field()
  @Matches(urlNameRegExp)
  @IsString()
  @IsLowercase()
  @Length(1, 50)
  name: string;

  @Field()
  @Length(1, 50)
  title: string;
}
