import React from 'react';
import ReactPlayer from 'react-player';
import { useRouter } from 'next/router';
import { useTwitchStreamQuery } from '@dream/types';

export const ChannelModeTwitchStream = () => {
  const { query } = useRouter();
  const channelName = typeof query?.channel === 'string' && query?.channel;
  const twitchStreamQuery = useTwitchStreamQuery({
    variables: { channelName },
  });

  const channelKey = twitchStreamQuery?.data?.twitchStream?.channelKey;

  if (!channelKey) {
    return null;
  }

  return (
    <div className="h-screen w-full flex flex-1">
      <ReactPlayer
        url={`https://www.twitch.tv/${channelKey}`}
        height="100%"
        width="100%"
        // playing
        muted
      />
    </div>
  );
};
