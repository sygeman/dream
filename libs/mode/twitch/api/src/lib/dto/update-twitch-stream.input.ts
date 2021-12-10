import { Field, ID, InputType } from '@nestjs/graphql';
import { IsLowercase, IsString, Length, Matches } from 'class-validator';
import { urlNameRegExp } from '@dream/utils-old/regexp';

@InputType()
export class UpdateTwitchStreamInput {
  @Field(() => ID)
  channelId: string;

  @Matches(urlNameRegExp)
  @IsString()
  @IsLowercase()
  @Length(1, 50)
  @Field()
  channelKey: string;
}
