import { Query, Resolver, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthTokens } from './models/AuthTokens';

@Resolver()
export class AuthResolvers {
  constructor(private readonly authService: AuthService) {}

  @Query(() => AuthTokens)
  async refresh(@Args('refreshToken') refreshToken: string) {
    return await this.authService.refreshToken(refreshToken);
  }
}
