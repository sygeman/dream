import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class AuthTokens {
  @Field()
  refreshToken: string;

  @Field()
  accessToken: string;
}
