import React from 'react';
import { ChannelSpotifyMode } from '@dream/mono-mode-spotify-ui';
import { ChannelTwitchMode } from '@dream/mono-mode-twitch-ui';
import { ChannelYoutubeMode } from '@dream/mono-mode-youtube-ui';
import { ChannelMode } from '@dream/mono-types';
import { ChannelHeader } from './channel-header';
import { useCommunityChannel } from '@dream/mono-use-community-channel';

export const ChannelContent = () => {
  const { channel } = useCommunityChannel();

  const getContentView = () => {
    switch (channel?.mode) {
      case ChannelMode.Spotify:
        return <ChannelSpotifyMode />;
      case ChannelMode.Twitch:
        return <ChannelTwitchMode />;
      case ChannelMode.Youtube:
        return <ChannelYoutubeMode />;
      default:
        return null;
    }
  };

  return (
    <div className="h-screen w-full flex flex-1 flex-col">
      <ChannelHeader />
      {getContentView()}
    </div>
  );
};
