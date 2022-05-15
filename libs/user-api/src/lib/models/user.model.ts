import { Locale } from '@prisma/mono';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';

registerEnumType(Locale, {
  name: 'Locale',
});

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

  @Field(() => Locale)
  locale?: Locale;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => [Profile], { nullable: true })
  profiles?: Profile[];
}
