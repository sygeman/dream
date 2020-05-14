import { Controller, Get, Request, Response, UseGuards } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { ProfilePayload } from '../profile/types/ProfilePayload';
import { AuthService } from './auth.service';
import { UsersService } from '../user/user.service';
import { ProfileService } from '../profile/profile.service';
import { WalletService } from '../wallet/wallet.service';
import { CurrencyType } from '../wallet/types/CurrencyType';

@Controller()
export class AuthController {
  cookieOptions;

  constructor(
    private readonly config: ConfigService,
    private readonly authService: AuthService,
    private readonly userService: UsersService,
    private readonly profileService: ProfileService,
    private readonly walletService: WalletService
  ) {
    const cookieDomain = config.get('auth.cookieDomain');

    if (cookieDomain) {
      this.cookieOptions = {
        domain: cookieDomain
      };
    }
  }

  getUserIdFromJWT(token: string) {
    try {
      const data: any = jwt.verify(token, this.config.get('auth.secretKey'));

      if (typeof data === 'object' && data && data.userId) {
        return data.userId;
      } else {
        throw new Error('Invalid jwt payload');
      }
    } catch (err) {
      return null;
    }
  }

  async createProfile(data: ProfilePayload, userId?: string) {
    const isNewUser = !userId;

    if (!userId) {
      const user = await this.userService.create();
      userId = user.id;

      // Create Wallets
      await Promise.all([
        this.walletService.create({ userId, currency: CurrencyType.coin }),
        this.walletService.create({ userId, currency: CurrencyType.real })
      ]);
    }

    const profile = await this.profileService.create({ ...data, userId });

    if (isNewUser) {
      await this.userService.update(
        { id: userId },
        {
          mainProfileId: profile.id,
          avatar: profile.avatar,
          name: profile.name
        }
      );
    }

    return profile;
  }

  async authend(req, res) {
    const isConnect = req.session.connect;

    let continuePath = '';

    if (req.session && req.session.redirectTo) {
      continuePath = new URL(req.session.redirectTo).searchParams.get(
        'continue'
      );
    }

    let redirectUrl = this.config.get('base.baseURL');

    if (isConnect) {
      redirectUrl = `${this.config.get('base.baseURL')}settings/integrations`;
    }

    if (continuePath) {
      redirectUrl += continuePath.slice(1);
    }

    let userId = null;

    if (req.cookies && req.cookies.accessToken) {
      userId = this.getUserIdFromJWT(req.cookies.accessToken);
    }

    if (isConnect && !userId) {
      res.clearCookie('accessToken', this.cookieOptions);
      res.clearCookie('refreshToken', this.cookieOptions);

      return res.redirect(redirectUrl);
    }

    const profilePayload: ProfilePayload = req.user;

    let profile = await this.profileService.findOne({
      where: {
        serviceId: profilePayload.serviceId,
        serviceName: profilePayload.serviceName
      }
    });

    const profileIsUsed = userId && profile && profile.userId !== userId;

    if (profileIsUsed) {
      return res.redirect(redirectUrl);
    }

    if (!profile) {
      profile = await this.createProfile(profilePayload, userId);
      userId = profile.userId;
    } else {
      userId = profile.userId;

      // Update profile
      await this.profileService.update({ id: profile.id }, profilePayload);

      // Update user
      await this.userService.update(
        {
          id: userId,
          mainProfileId: profile.id
        },
        {
          name: profilePayload.name,
          avatar: profilePayload.avatar
        }
      );
    }

    const tokens = await this.authService.createToken(userId);
    res.cookie('accessToken', tokens.accessToken, this.cookieOptions);
    res.cookie('refreshToken', tokens.refreshToken, this.cookieOptions);

    return res.redirect(redirectUrl);
  }

  // Google
  @Get('auth/google')
  authGoogle(@Request() req, @Response() res) {
    req.session.redirectTo = req.headers.referer;
    req.session.connect = false;
    res.redirect(`${this.config.get('base.apiURL')}authwr/google`);
  }

  @Get('auth/connect/google')
  authConnectGoogle(@Request() req, @Response() res) {
    req.session.redirectTo = req.headers.referer;
    req.session.connect = true;
    res.redirect(`${this.config.get('base.apiURL')}authwr/google`);
  }

  @Get('authwr/google')
  @UseGuards(AuthGuard('google'))
  authWRGoogle() {}

  @Get('authend/google')
  @UseGuards(AuthGuard('google'))
  async authendGoogle(@Request() req, @Response() res) {
    return await this.authend(req, res);
  }

  // VK
  @Get('auth/vkontakte')
  authVK(@Request() req, @Response() res) {
    req.session.redirectTo = req.headers.referer;
    req.session.connect = false;
    res.redirect(`${this.config.get('base.apiURL')}authwr/vkontakte`);
  }

  @Get('auth/connect/vkontakte')
  authConnectVK(@Request() req, @Response() res) {
    req.session.redirectTo = req.headers.referer;
    req.session.connect = true;
    res.redirect(`${this.config.get('base.apiURL')}authwr/vkontakte`);
  }

  @Get('authwr/vkontakte')
  @UseGuards(AuthGuard('vkontakte'))
  authWRVK() {}

  @Get('authend/vkontakte')
  @UseGuards(AuthGuard('vkontakte'))
  async authendVK(@Request() req, @Response() res) {
    return await this.authend(req, res);
  }

  // Twitch
  @Get('auth/twitch')
  authTwitch(@Request() req, @Response() res) {
    req.session.redirectTo = req.headers.referer;
    req.session.connect = false;
    res.redirect(`${this.config.get('base.apiURL')}authwr/twitch`);
  }

  @Get('auth/connect/twitch')
  authConnectTwitch(@Request() req, @Response() res) {
    req.session.redirectTo = req.headers.referer;
    req.session.connect = true;
    res.redirect(`${this.config.get('base.apiURL')}authwr/twitch`);
  }

  @Get('authwr/twitch')
  @UseGuards(AuthGuard('twitch'))
  authWRTwitch() {}

  @Get('authend/twitch')
  @UseGuards(AuthGuard('twitch'))
  async authendTwitch(@Request() req, @Response() res) {
    return await this.authend(req, res);
  }

  @Get('logout')
  async logout(@Request() req, @Response() res) {
    await this.authService.removeToken(req.cookies.refreshToken);

    res.clearCookie('accessToken', this.cookieOptions);
    res.clearCookie('refreshToken', this.cookieOptions);

    res.redirect(this.config.get('base.baseURL'));
  }
}
