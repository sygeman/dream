import React from 'react';
import ReactPlayer from 'react-player';
import { useRouter } from 'next/router';
import { useChannelQuery, useTwitchStreamQuery } from '@dream/types';

export const ChannelModeTwitchStream = () => {
  const { query } = useRouter();
  const channelName = typeof query?.channel === 'string' && query?.channel;

  const channelQuery = useChannelQuery({
    variables: { name: channelName },
    skip: !channelName,
  });
  const channel = channelQuery?.data?.channel;

  const twitchStreamQuery = useTwitchStreamQuery({
    variables: { channelId: channel?.id },
    skip: !channel?.id,
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
