import React from 'react';
import dynamic from 'next/dynamic';
import { ChannelMode } from '@dream/types';
import { ChannelHeader } from './channel-header';
import { useCommunityChannel } from '../use-community-channel';

const getContentView = (mode: ChannelMode) => {
  switch (mode) {
    case ChannelMode.Spotify:
      return dynamic(() =>
        import('@dream/mode/spotify/ui').then((c) => c.ChannelSpotifyMode)
      );
    case ChannelMode.Twitch:
      return dynamic(() =>
        import('@dream/mode/twitch/ui').then((c) => c.ChannelTwitchMode)
      );
    case ChannelMode.Youtube:
      return dynamic(() =>
        import('@dream/mode/youtube/ui').then((c) => c.ChannelYoutubeMode)
      );
    default:
      return null;
  }
};

export const CommunityContent = () => {
  const { channel } = useCommunityChannel();
  const Content = getContentView(channel?.mode);

  return (
    <div className="h-screen w-full flex flex-1 flex-col">
      <ChannelHeader />
      {Content && <Content />}
    </div>
  );
};
