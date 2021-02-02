import { InputType, Field, ArgsType } from '@nestjs/graphql';

@InputType()
export class UserWhereArgs {
  @Field()
  id: string;
}

@ArgsType()
export class UserArgs {
  @Field((type) => UserWhereArgs)
  where: UserWhereArgs;
}
