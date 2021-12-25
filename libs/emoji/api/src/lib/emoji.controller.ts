import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@dream/auth-api';
import { ConfigService } from '@nestjs/config';
import * as Minio from 'minio';

@Controller()
export class EmojiController {
  private minioClient: Minio.Client;

  constructor(private readonly config: ConfigService) {
    this.minioClient = new Minio.Client({
      endPoint: 'minio',
      port: 9000,
      useSSL: false,
      accessKey: this.config.get('db.minioAccessKey'),
      secretKey: this.config.get('db.minioSecretKey'),
    });
  }

  @Post('emoji/upload')
  // @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async emojiUpload(@UploadedFile() file) {
    return await this.minioClient.putObject(
      'emojis',
      file.originalname,
      file.buffer
    );
  }
}
