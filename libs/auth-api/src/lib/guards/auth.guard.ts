import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(ctx: ExecutionContext) {
    const { userId, tokenIsInvalid } = ctx.getArgs()[2];

    if (tokenIsInvalid) {
      throw new UnauthorizedException();
    }

    if (!userId) return false;

    return true;
  }
}
