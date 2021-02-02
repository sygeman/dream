import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  async canActivate(ctx: ExecutionContext) {
    const { user } = ctx.getArgs()[2];
    return user.role === 'admin';
  }
}
