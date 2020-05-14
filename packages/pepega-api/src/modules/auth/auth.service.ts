import * as jwt from 'jsonwebtoken';
import * as ms from 'ms';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { Token as TokenEntity } from './tokens.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(TokenEntity)
    private readonly tokensRepository: Repository<TokenEntity>,
    private readonly config: ConfigService
  ) {}

  jwtValidation = token => {
    try {
      return jwt.verify(token, this.config.get('auth.secretKey'));
    } catch (err) {
      return null;
    }
  };

  parseAuthToken(authorization) {
    if (!authorization) {
      return null;
    }

    const authHeader = authorization.split(' ');

    if (authHeader[0].toLowerCase() !== 'bearer') {
      return null;
    }

    const jwtToken = authHeader[1];

    if (!jwtToken) {
      return null;
    }

    return this.jwtValidation(jwtToken);
  }

  async createToken(userId: string) {
    const user: JwtPayload = { userId };

    const tokenEntity = new TokenEntity();
    tokenEntity.userId = userId;
    const tokenData = await this.tokensRepository.save(tokenEntity);
    const refreshToken = tokenData.id;

    const accessToken = jwt.sign(user, this.config.get('auth.secretKey'), {
      expiresIn: this.config.get('auth.expiresIn')
    });

    return {
      accessToken,
      refreshToken
    };
  }

  async refreshToken(refreshToken: string) {
    const tokenData = await this.tokensRepository.findOne(refreshToken);
    const invalidError = new Error('Invalid Refresh Token');

    if (!tokenData) {
      throw invalidError;
    }

    const now = new Date().getTime();
    const created = new Date(tokenData.createdAt).getTime();

    if (now - created > ms('60d')) {
      await this.tokensRepository.remove(tokenData);
      throw invalidError;
    }

    await this.tokensRepository.remove(tokenData);

    return await this.createToken(tokenData.userId);
  }

  async removeToken(refreshToken: string) {
    const tokenData = await this.tokensRepository.findOne(refreshToken);

    if (!tokenData) {
      Logger.log(`refreshToken ${refreshToken} not found`);
      return;
    }

    return this.tokensRepository.remove(tokenData);
  }
}
