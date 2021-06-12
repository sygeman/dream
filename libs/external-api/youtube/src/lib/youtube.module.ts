import { HttpModule, Module } from '@nestjs/common';
import { YoutubeService } from './youtube.service';

@Module({
  imports: [HttpModule],
  providers: [YoutubeService],
  exports: [YoutubeService],
})
export class YoutubeModule {}
