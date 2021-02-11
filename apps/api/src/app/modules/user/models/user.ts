import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserRole } from '../types/UserRole';

@ObjectType()
export class User {
  @Field((type) => ID)
  id: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  avatar: string;

  @Field((type) => UserRole)
  role: UserRole;

  @Field() banned: boolean;

  @Field((type) => ID)
  mainProfileId: string;

  @Field() createdAt: Date;

  @Field() updatedAt: Date;
}
