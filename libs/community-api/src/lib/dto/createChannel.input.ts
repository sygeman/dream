import { Field, ID, InputType } from '@nestjs/graphql';
import { IsLowercase, IsString, Length, Matches } from 'class-validator';
import { urlNameRegExp } from '@dream/utils/regexp/url-name';

@InputType()
export class CreateChannelInput {
  @Field(() => ID)
  communityId: string;

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
