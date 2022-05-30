import {
  Controller,
  Get,
  Query,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PrismaService } from '@dream/server-state/prisma';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AuthController {
  constructor(
    private prisma: PrismaService,
    private authService: AuthService,
    private readonly config: ConfigService
  ) {}

  async authend(req, res) {
    const { redirectUri, codeHandler } = req.session;
    const profile = req?.user;

    // Update or create profile and user
    if (!profile) {
      // Redirect with error
      return res.redirect(redirectUri);
    }

    const existProfile = await this.prisma.profile.findFirst({
      where: {
        provider: profile?.provider,
        serviceId: profile?.serviceId,
      },
    });

    let userId;

    if (existProfile) {
      await this.prisma.profile.update({
        where: { id: existProfile.id },
        data: {
          accessToken: profile.accessToken,
          refreshToken: profile.refreshToken,
          name: profile.name,
          avatar: profile.avatar,
          user: {
            update: {
              name: profile.name,
              avatar: profile.avatar,
            },
          },
        },
      });

      userId = existProfile.userId;
    } else {
      const newProfile = await this.prisma.profile.create({
        data: {
          provider: profile.provider,
          serviceId: profile.serviceId,
          accessToken: profile.accessToken,
          refreshToken: profile.refreshToken,
          name: profile.name,
          avatar: profile.avatar,
          user: {
            create: {
              name: profile.name,
              avatar: profile.avatar,
            },
          },
        },
      });

      userId = newProfile.userId;
    }

    const token = await this.authService.createToken(userId);

    return res.redirect(`${codeHandler}token=${token}&redirect=${redirectUri}`);
  }

  @Get('auth/twitch')
  authTwitch(
    @Request() req,
    @Response() res,
    @Query('code_handler') codeHandler,
    @Query('redirect_uri') redirectUri
  ) {
    req.session.codeHandler = codeHandler;
    req.session.redirectUri = redirectUri;
    res.redirect(`${this.config.get('base.apiURL')}authwr/twitch`);
  }

  @Get('authwr/twitch')
  @UseGuards(AuthGuard('twitch'))
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  authWRTwitch() {}

  @Get('authend/twitch')
  @UseGuards(AuthGuard('twitch'))
  async authendTwitch(@Request() req, @Response() res) {
    return this.authend(req, res);
  }
}
