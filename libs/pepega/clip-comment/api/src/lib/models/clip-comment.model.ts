import { UserRole } from '@prisma/pepega';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ClipCommentUser {
  @Field()
  id: string;

  @Field(() => UserRole, { nullable: true })
  role?: UserRole;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  avatar?: string;
}

@ObjectType()
export class ClipComment {
  @Field()
  id: string;

  @Field()
  userId: string;

  @Field(() => ClipCommentUser)
  user: ClipCommentUser;

  @Field()
  clipId: string;

  @Field()
  content: string;

  @Field()
  createdAt: string;

  @Field()
  updatedAt: string;
}
