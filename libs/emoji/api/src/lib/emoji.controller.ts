import {
  Body,
  Controller,
  Headers,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthService } from '@dream/auth-api';
import { ConfigService } from '@nestjs/config';
import * as Minio from 'minio';
import { PrismaService } from '@dream/prisma';

@Controller()
export class EmojiController {
  private minioClient: Minio.Client;

  constructor(
    private readonly config: ConfigService,
    private prisma: PrismaService,
    private authService: AuthService
  ) {
    this.minioClient = new Minio.Client({
      endPoint: 'minio',
      port: 9000,
      useSSL: false,
      accessKey: this.config.get('db.minioAccessKey'),
      secretKey: this.config.get('db.minioSecretKey'),
    });
  }

  @Post('emoji/upload')
  @UseInterceptors(FileInterceptor('file'))
  async emojiUpload(
    @UploadedFile() file,
    @Body('communityId') communityId: string,
    @Headers('Authorization') token: string
  ) {
    const { userId } = await this.authService.getTokenData(token);

    if (!userId) {
      throw new Error('Deny');
    }

    const emoji = await this.prisma.emoji.create({
      data: {
        alias: file.originalname.split('.')[0],
        type: file.mimetype,
        community: {
          connect: { id: communityId },
        },
        author: {
          connect: { id: userId },
        },
      },
    });

    await this.minioClient.putObject(
      'emojis',
      `${emoji.id}.${emoji.type.split('/')[1]}`,
      file.buffer
    );

    return emoji;
  }
}
