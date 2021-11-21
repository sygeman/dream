import React from 'react';
import { ChannelSpotifyMode } from '@dream/mode/spotify/ui';
import { ChannelTwitchMode } from '@dream/mode/twitch/ui';
import { ChannelYoutubeMode } from '@dream/mode/youtube/ui';
import { ChannelMode } from '@dream/types';
import { ChannelHeader } from './channel-header';
import { useCommunityChannel } from '../use-community-channel';

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
