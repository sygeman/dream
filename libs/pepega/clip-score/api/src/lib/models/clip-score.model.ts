import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { ClipScoreAction } from '@prisma/pepega';

registerEnumType(ClipScoreAction, {
  name: 'ClipScoreAction',
});

@ObjectType()
export class ClipScore {
  @Field()
  id: string;

  @Field()
  userId: string;

  @Field()
  clipId: string;

  @Field(() => ClipScoreAction)
  action: ClipScoreAction;

  @Field()
  coins: number;

  @Field()
  createdAt: string;

  @Field()
  updatedAt: string;
}
