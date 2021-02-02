import { UseGuards } from '@nestjs/common';
import { Query, Resolver, Args, Mutation, Context } from '@nestjs/graphql';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { AuthTokens } from './models/AuthTokens';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query(() => AuthTokens)
  async tokens(@Args('authCode') authCode: string) {
    return this.authService.getTokens(authCode);
  }

  @Query(() => String)
  async refresh(@Args('refreshToken') refreshToken: string) {
    return this.authService.refreshToken(refreshToken);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Boolean)
  async logout(
    @Args('refreshToken') refreshToken: string,
    @Context('userId') userId
  ) {
    return this.authService.logout(refreshToken, userId);
  }
}
