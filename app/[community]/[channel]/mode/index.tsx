import { ChannelMode } from '@prisma/client';
import { ChannelYoutubeMode } from './youtube';
import { ChannelTwitchMode } from './twitch';

type Props = {
  mode?: ChannelMode;
};

export const ChannelModeContent = ({ mode }: Props) => {
  switch (mode) {
    case ChannelMode.TWITCH:
      return <ChannelTwitchMode />;
    case ChannelMode.YOUTUBE:
      return <ChannelYoutubeMode />;
    default:
      return null;
  }
};
