import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(ctx: ExecutionContext) {
    const { token } = ctx.getArgs()[2];
    const { userId } = await this.authService.getTokenData(token);
    return !!userId;
  }
}
