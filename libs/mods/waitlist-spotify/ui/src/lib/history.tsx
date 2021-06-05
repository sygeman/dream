import React from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { ClockIcon } from '@heroicons/react/solid';
import { useWaitlistSpotifyHistoryQuery } from '@dream/types';
import { TrackFromList } from './components/track-from-list';

export const ChannelModeWaitlistSpotifyHistory = ({ hidden = false }) => {
  const { query } = useRouter();
  const channelName = typeof query?.channel === 'string' && query?.channel;

  const historyQuery = useWaitlistSpotifyHistoryQuery({
    variables: { channelName },
    skip: !channelName,
    pollInterval: 5000,
  });

  const historyItems = historyQuery?.data?.waitlistSpotifyHistory?.items || [];

  return (
    <div
      className={clsx(
        'flex flex-col flex-shrink-0 justify-end py-2 overflow-hidden',
        !hidden && 'flex-1'
      )}
    >
      {!hidden &&
        historyItems.map((item) => (
          <div key={item.data.id}>
            <TrackFromList
              cover={item.data.cover}
              artists={item.data.artists}
              title={item.data.title}
              avatar={item.data.author.avatar}
              createdAt={item.data.endedAt}
            />
          </div>
        ))}
      <div className="flex text-xs text-accent font-medium px-4 py-2">
        <ClockIcon className="h-4 text-accent mr-2 opacity-50" />
        <span>Previous Plays</span>
      </div>
    </div>
  );
};
