import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(ctx: ExecutionContext) {
    const { user } = ctx.getArgs()[2];
    return !!user && !user.banned;
  }
}
