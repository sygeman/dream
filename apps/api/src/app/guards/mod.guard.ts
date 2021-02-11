import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class ModGuard implements CanActivate {
  async canActivate(ctx: ExecutionContext) {
    const { user } = ctx.getArgs()[2];
    return user.role === 'mod' || user.role === 'admin';
  }
}
