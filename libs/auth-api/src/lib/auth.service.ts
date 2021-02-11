import * as jwt from 'jsonwebtoken';
import { PrismaService } from '@dream/prisma';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly config: ConfigService,
    private prisma: PrismaService
  ) {}

  accessTokenFromHeader = (authorization: string) => {
    if (!authorization) return null;

    const authHeader = authorization.split(' ');

    if (authHeader[0].toLowerCase() !== 'bearer') {
      return null;
    }

    return authHeader[1];
  };

  jwtValidation = (token: string) => {
    try {
      const payload = jwt.verify(token, this.config.get('auth.secretKey'));

      if (typeof payload === 'object') {
        return payload;
      }

      return undefined;
    } catch (err) {
      return undefined;
    }
  };

  async createAccessToken(userId: string) {
    const user = { userId };

    const accessToken = jwt.sign(user, this.config.get('auth.secretKey'), {
      expiresIn: '15s',
    });

    return accessToken;
  }

  async createToken(userId: string, withCode = false) {
    const accessToken = await this.createAccessToken(userId);

    const token = await this.prisma.token.create({
      data: {
        accessToken,
        code: withCode ? undefined : null,
        user: { connect: { id: userId } },
      },
    });

    const refreshToken = token.id;

    return { accessToken, refreshToken, code: token.code };
  }

  async getTokens(authCode: string) {
    const tokens = await this.prisma.token.findFirst({
      where: {
        code: authCode,
      },
    });

    if (!tokens) {
      throw 'auth code is invalid';
    }

    // await this.prisma.token.update({
    //   where: { id: tokens.id },
    //   data: { code: null, accessToken: null },
    // });

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.id,
    };
  }

  async refreshToken(refreshToken: string) {
    const token = await this.prisma.token.findFirst({
      where: { id: refreshToken },
    });

    if (!token) {
      throw 'refresh token is invalid';
    }

    const accessToken = await this.createAccessToken(token.userId);

    return accessToken;
  }

  async logout(refreshToken: string, userId: string) {
    const token = await this.prisma.token.findFirst({
      where: { id: refreshToken, userId },
    });

    if (!token) {
      throw 'refresh token or user is invalid';
    }

    await this.prisma.token.delete({ where: { id: refreshToken } });

    return true;
  }
}
