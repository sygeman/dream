import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Context } from '@nestjs/graphql';
import { AuthGuard } from './guards';
import { AuthService } from './auth.service';
@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => Boolean)
  async logout(@Context('token') token) {
    await this.authService.logout(token);
    return true;
  }
}
