import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { UserCoinAction } from '@prisma/pepega';

registerEnumType(UserCoinAction, {
  name: 'UserCoinAction',
});

@ObjectType()
export class UserCoin {
  @Field()
  id: string;

  @Field()
  userId: string;

  @Field(() => UserCoinAction)
  action: UserCoinAction;

  @Field()
  coins: number;

  @Field()
  createdAt: string;

  @Field()
  updatedAt: string;
}
