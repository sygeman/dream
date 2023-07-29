import { ChannelMode } from '@prisma/client';
// import { ChannelSpotifyMode } from './spotify';
// import { ChannelYoutubeMode } from './youtube';
import { ChannelTwitchMode } from './twitch';

type Props = {
  mode?: ChannelMode;
};

export const ChannelContent = ({ mode }: Props) => {
  switch (mode) {
    // case ChannelMode.SPOTIFY:
    //   return <ChannelSpotifyMode />;
    case ChannelMode.TWITCH:
      return <ChannelTwitchMode />;
    // case ChannelMode.YOUTUBE:
    //   return <ChannelYoutubeMode />;
    default:
      return null;
  }
};
