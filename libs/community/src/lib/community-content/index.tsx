import React from 'react';
import { useRouter } from 'next/router';
import { ChannelModeWaitlistSpotify } from '@dream/mods/waitlist-spotify/ui';
import { ChannelModeTwitchStream } from '@dream/mods/twitch-stream/ui';
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
      case ChannelMode.WaitlistSpotify:
        return <ChannelModeWaitlistSpotify />;
      case ChannelMode.StreamTwitch:
        return <ChannelModeTwitchStream />;
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
