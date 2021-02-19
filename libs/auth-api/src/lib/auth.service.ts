import { PrismaService } from '@dream/prisma';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async createToken(userId: string) {
    const tokenData = await this.prisma.token.create({
      data: { userId },
    });

    return tokenData.id;
  }

  async getTokenData(id: string) {
    let userId: string;
    let tokenIsInvalid = false;

    if (id) {
      const tokenData = await this.prisma.token.findUnique({ where: { id } });

      if (tokenData) {
        userId = tokenData.userId;
      } else {
        tokenIsInvalid = true;
      }
    }

    return { userId, tokenIsInvalid };
  }

  async logout(token: string) {
    return this.prisma.token.delete({ where: { id: token } });
  }
}
