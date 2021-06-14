import React from 'react';
import { useRouter } from 'next/router';
import { ChannelModeWaitlistSpotify } from '@dream/mode/waitlist-spotify/ui';
import { ChannelModeTwitchStream } from '@dream/mode/twitch-stream/ui';
import { ChannelModeWaitlistYoutube } from '@dream/mode/waitlist-youtube/ui';
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
      case ChannelMode.WaitlistYoutube:
        return <ChannelModeWaitlistYoutube />;
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
