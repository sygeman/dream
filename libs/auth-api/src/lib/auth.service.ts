import { PrismaService } from '@dream/prisma/mono';
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

    if (id) {
      const tokenData = await this.prisma.token.findUnique({ where: { id } });

      if (tokenData) {
        userId = tokenData.userId;
      }
    }

    return { userId };
  }

  async logout(token: string) {
    return this.prisma.token.delete({ where: { id: token } });
  }
}
