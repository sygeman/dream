import React from 'react';
import ReactPlayer from 'react-player';
import { useRouter } from 'next/router';
import { useResizeDetector } from 'react-resize-detector';
import { useChannelQuery, useTwitchStreamQuery } from '@dream/types';

export const ChannelModeTwitchStream = () => {
  const { width, height, ref } = useResizeDetector();
  const heightWithMargin = height - 40;

  // By width
  let w = width;
  let h = (width * 9) / 16;

  // By height
  if (h >= heightWithMargin) {
    h = heightWithMargin;
    w = (heightWithMargin * 16) / 9;
  }

  if (isNaN(w) || isNaN(h)) {
    h = 0;
    w = 0;
  }

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
    <div ref={ref} className="h-full w-full bg-backgorud-light">
      <div className="bg-black flex justify-center">
        <div style={{ width: w, height: h }}>
          <ReactPlayer
            url={`https://www.twitch.tv/${channelKey}`}
            height="100%"
            width="100%"
            // playing
            muted
          />
        </div>
      </div>
    </div>
  );
};
