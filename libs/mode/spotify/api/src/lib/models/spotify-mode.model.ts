import { SpotifyModeStrategy } from '.prisma/client';
import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';

registerEnumType(SpotifyModeStrategy, {
  name: 'SpotifyModeStrategy',
});

@ObjectType()
export class SpotifyMode {
  @Field()
  id: string;

  @Field({ nullable: true })
  hostId?: string;

  @Field(() => SpotifyModeStrategy)
  strategy: SpotifyModeStrategy;
}
