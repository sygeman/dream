import React from 'react';
import ReactPlayer from 'react-player';
import { useTwitchStreamQuery } from './twitch-stream.api';
import { useCommunityChannel } from '@dream/utils/use-community-channel';

export const ChannelTwitchMode = () => {
  const { channelId } = useCommunityChannel();

  const twitchStreamQuery = useTwitchStreamQuery({
    variables: { channelId },
    skip: !channelId,
  });

  const channelKey = twitchStreamQuery?.data?.twitchStream?.channelKey;

  return (
    <div className="h-full w-full bg-background-light">
      <div className="bg-black flex justify-center aspect-w-16 aspect-h-9">
        {channelKey && (
          <ReactPlayer
            url={`https://www.twitch.tv/${channelKey}`}
            height="100%"
            width="100%"
            // playing
            muted
          />
        )}
      </div>
    </div>
  );
};
