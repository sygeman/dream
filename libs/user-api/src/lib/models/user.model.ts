import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Profile {
  @Field()
  id: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  avatar?: string;

  @Field()
  provider: string;
}

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  avatar?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => [Profile], { nullable: true })
  profiles?: Profile[];
}
