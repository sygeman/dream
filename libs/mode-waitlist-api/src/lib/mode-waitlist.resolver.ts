import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PrismaService } from '@dream/prisma';
// import { Community } from './models/community.model';
import { UseGuards } from '@nestjs/common';
// import { AuthGuard } from '@dream/auth-api';
// import { CreateCommunityInput } from './dto/createCommunity.input';

@Resolver()
export class ModeWaitlistResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => Boolean)
  modeWaitlist(@Args({ name: 'channelId' }) channelId: string) {
    return true;
  }

  @Query(() => [Boolean])
  modeWaitlistQueue(@Args({ name: 'channelId' }) channelId: string) {
    return [true];
  }

  // mutation
  //     addTrack()
  //     removeTrack()
  //     skip()
}
