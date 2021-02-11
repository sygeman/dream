import { ValidateNested, IsOptional } from 'class-validator';
import {
  InputType,
  ArgsType,
  Field,
  Int,
  registerEnumType,
} from '@nestjs/graphql';

export enum CommunityClipOrderName {
  createdAt = 'createdAt',
  clipRating = 'clipRating',
}

registerEnumType(CommunityClipOrderName, {
  name: 'CommunityClipOrderName',
});

export enum OrderType {
  ASC = 'ASC',
  DESC = 'DESC',
}

registerEnumType(OrderType, {
  name: 'OrderType',
});

@InputType()
export class CommunityClipOrderByInput {
  @Field((type) => CommunityClipOrderName, {
    defaultValue: CommunityClipOrderName.createdAt,
  })
  @ValidateNested()
  name: CommunityClipOrderName;

  @Field((type) => String, { defaultValue: OrderType.DESC })
  @ValidateNested()
  type: OrderType;
}

@ArgsType()
export class CommunityClipsArgs {
  @Field((type) => String)
  @ValidateNested()
  communityId: string;

  @Field((type) => Boolean, { nullable: true })
  @IsOptional()
  approved?: boolean;

  @Field((type) => CommunityClipOrderByInput, {
    defaultValue: {
      name: CommunityClipOrderName.createdAt,
      type: OrderType.DESC,
    },
  })
  @IsOptional()
  @ValidateNested()
  orderBy: CommunityClipOrderByInput;

  @Field((type) => String, { nullable: true })
  @IsOptional()
  @ValidateNested()
  startedAt?: string;

  @Field((type) => Int, { defaultValue: 25 })
  @ValidateNested()
  first?: number;

  @Field((type) => Int, { defaultValue: 0 })
  @ValidateNested()
  skip?: number;
}
