import { PrismaService } from '@dream/prisma/mono';
import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TenorService {
  private readonly logger = new Logger(TenorService.name);
  private key = 'J9KE7ZY93YW1';

  constructor(
    private prisma: PrismaService,
    private httpService: HttpService,
    private readonly config: ConfigService
  ) {}

  async getGif(id: string) {
    const gifFromPrisma = await this.prisma.tenorGif.findUnique({
      where: { id },
    });

    if (gifFromPrisma) return gifFromPrisma;

    const { data } = await this.httpService
      .get(`https://g.tenor.com/v1/gifs?ids=${id}&key=${this.key}`)
      .toPromise();

    const tenorGif = data?.results?.[0];

    if (!tenorGif) {
      throw 'Gif not found';
    }

    const mp4 = tenorGif.media[0].mp4;

    return this.prisma.tenorGif.create({
      data: {
        id: tenorGif.id,
        video: mp4.url,
        preview: mp4.preview,
        height: mp4.dims[1],
        width: mp4.dims[0],
      },
    });
  }
}
