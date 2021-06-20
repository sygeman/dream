import React from 'react';
import { useRouter } from 'next/router';
import { ChannelSpotifyMode } from '@dream/mode/spotify/ui';
import { ChannelTwitchMode } from '@dream/mode/twitch/ui';
import { ChannelYoutubeMode } from '@dream/mode/youtube/ui';
import { useChannelQuery, ChannelMode } from '@dream/types';
import { ChannelHeader } from './channel-header';

export const CommunityContent = () => {
  const router = useRouter();
  const name =
    typeof router.query?.channel === 'string' && router.query?.channel;

  const communityQuery = useChannelQuery({
    variables: { name },
    skip: !name,
  });

  const channel = communityQuery?.data?.channel;

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
