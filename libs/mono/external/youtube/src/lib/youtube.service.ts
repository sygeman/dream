import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import * as querystring from 'querystring';

const toSeconds = (duration) => {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

  const hours = parseInt(match[1]) || 0;
  const minutes = parseInt(match[2]) || 0;
  const seconds = parseInt(match[3]) || 0;

  return hours * 3600 + minutes * 60 + seconds;
};

@Injectable()
export class YoutubeService {
  constructor(
    private httpService: HttpService,
    private readonly config: ConfigService
  ) {}

  async getVideo(videoId: string): Promise<{
    id: string;
    title: string;
    cover: string;
    duration_ms: number;
  }> {
    const params = querystring.stringify({
      key: this.config.get('youtube.key'),
      part: 'snippet, contentDetails',
      id: videoId,
    });

    const res = await this.httpService
      .get(`https://www.googleapis.com/youtube/v3/videos?${params}`)
      .toPromise();

    return res.data.items.map(({ id, snippet, contentDetails }) => ({
      id,
      title: snippet.title,
      cover: snippet.thumbnails.default.url,
      duration_ms: toSeconds(contentDetails.duration) * 1000,
    }))?.[0];
  }
}
