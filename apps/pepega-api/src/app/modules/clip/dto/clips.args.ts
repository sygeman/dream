import { ValidateNested, IsOptional } from 'class-validator';
import {
  InputType,
  ArgsType,
  Field,
  Int,
  registerEnumType,
} from 'type-graphql';

export enum ClipOrderName {
  clipCreatedAt = 'clipCreatedAt',
  clipReactionUpdatedAt = 'clipReactionUpdatedAt',
  communityClipCreatedAt = 'communityClipCreatedAt',
  clipHistoryUpdatedAt = 'clipHistoryUpdatedAt',
  clipRating = 'clipRating',
}

registerEnumType(ClipOrderName, {
  name: 'ClipOrderName',
});

export enum OrderType {
  ASC = 'ASC',
  DESC = 'DESC',
}

registerEnumType(OrderType, {
  name: 'OrderType',
});

@InputType()
export class ClipOrderByInput {
  @Field(type => ClipOrderName, {
    defaultValue: ClipOrderName.clipCreatedAt,
  })
  @ValidateNested()
  name: ClipOrderName;

  @Field(type => String, { defaultValue: OrderType.DESC })
  @ValidateNested()
  type: OrderType;
}

@ArgsType()
export class ClipsArgs {
  @Field(type => ClipOrderByInput, {
    defaultValue: {
      name: ClipOrderName.clipCreatedAt,
      type: OrderType.DESC,
    },
  })
  @IsOptional()
  @ValidateNested()
  orderBy: ClipOrderByInput;

  @Field(type => String, { nullable: true })
  @IsOptional()
  @ValidateNested()
  startedAt?: string;

  @Field(type => Int, { nullable: true })
  @IsOptional()
  @ValidateNested()
  ratingMin?: number;

  @Field(type => String, { nullable: true })
  @IsOptional()
  @ValidateNested()
  likedUserId?: string;

  @Field(type => String, { nullable: true })
  @IsOptional()
  @ValidateNested()
  communityId?: string;

  @Field(type => String, { nullable: true })
  @IsOptional()
  @ValidateNested()
  collectionId?: string;

  @Field(type => String, { nullable: true })
  @IsOptional()
  @ValidateNested()
  communityClipAuthorId?: string;

  @Field(type => String, { nullable: true })
  @IsOptional()
  @ValidateNested()
  historyUserId?: string;

  @Field(type => Int, { defaultValue: 25 })
  @ValidateNested()
  limit?: number;

  @Field(type => Int, { defaultValue: 0 })
  @ValidateNested()
  offset?: number;
}
