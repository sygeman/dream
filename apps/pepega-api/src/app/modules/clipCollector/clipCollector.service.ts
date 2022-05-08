import { Injectable, Logger } from '@nestjs/common';
import { TwitchService } from '../twitch/twitch.service';
import { ClipCollectionService } from '../clipCollection/clipCollection.service';

@Injectable()
export class ClipCollectorService {
  constructor(
    private readonly twitchService: TwitchService,
    private readonly clipCollectionService: ClipCollectionService,
  ) {
    // this.collect({
    //   channelIds: ['23161357', '22484632'],
    //   clipCollectionId: '18e86329-6fbc-454e-882f-45a4159bc407',
    // });
  }

  collectChannel = async ({ channelId, clipCollectionId }) => {
    const clips = await this.twitchService.clips({
      broadcaster_id: channelId,
      first: 4,
    });

    return Promise.all(
      clips.data.map(clip => {
        this.clipCollectionService.addClip({
          clipCollectionId,
          clipId: clip.id,
        });
      }),
    );
  };

  async collect({ channelIds, clipCollectionId }) {
    await this.clipCollectionService.removeAllClips({ clipCollectionId });

    return await Promise.all(
      channelIds.map(channelId =>
        this.collectChannel({ channelId, clipCollectionId }),
      ),
    );
  }
}
