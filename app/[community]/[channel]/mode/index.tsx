import { ChannelMode } from '@prisma/client';

import { ChannelTwitchMode } from './twitch';
import { ChannelYoutubeMode } from './youtube';

type Properties = {
  mode?: ChannelMode;
};

export const ChannelModeContent = ({ mode }: Properties) => {
  switch (mode) {
    case ChannelMode.TWITCH: {
      return <ChannelTwitchMode />;
    }
    case ChannelMode.YOUTUBE: {
      return <ChannelYoutubeMode />;
    }
    default: {
      return;
    }
  }
};
