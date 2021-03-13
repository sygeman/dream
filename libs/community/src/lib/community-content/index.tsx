import { useRouter } from 'next/router';
import React from 'react';
import { ChannelModeWaitlist } from '@dream/mode-waitlist';
import { useChannelQuery, ChannelMode } from '@dream/types';
import ReactPlayer from 'react-player';

const ChannelModeStream = () => {
  return (
    <div className="h-screen w-full flex flex-1">
      <ReactPlayer
        url="https://www.twitch.tv/sygeman"
        height="100%"
        width="100%"
        playing
        muted
      />
    </div>
  );
};

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
        return <ChannelModeWaitlist />;
      case ChannelMode.StreamTwitch:
        return <ChannelModeStream />;
      default:
        return null;
    }
  };

  return (
    <div className="h-screen w-full flex flex-1 flex-col">
      {getContentView()}
    </div>
  );
};
