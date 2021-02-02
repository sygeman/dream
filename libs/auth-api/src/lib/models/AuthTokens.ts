import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthTokens {
  @Field()
  refreshToken: string;

  @Field()
  accessToken: string;
}
