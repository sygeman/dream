import React from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import {
  useWaitlistSpotifyQueueQuery,
  useWaitlistSpotifyQueueUpdatedSubscription,
} from '@dream/types';
import { TrackFromList } from './components/track-from-list';
import { ViewListIcon } from '@heroicons/react/solid';

export const ChannelModeWaitlistSpotifyQueue = ({ hidden = false }) => {
  const { query } = useRouter();
  const channelName = typeof query?.channel === 'string' && query?.channel;

  const queueQuery = useWaitlistSpotifyQueueQuery({
    variables: { channelName },
    skip: !channelName,
  });

  useWaitlistSpotifyQueueUpdatedSubscription({
    variables: { channelName },
    skip: !channelName,
    onSubscriptionData: () => {
      queueQuery.refetch();
    },
  });

  const queueItems = queueQuery?.data?.waitlistSpotifyQueue?.items || [];

  return (
    <div
      className={clsx(
        'flex flex-col flex-shrink-0 justify-start py-2 overflow-hidden',
        !hidden && 'flex-1'
      )}
    >
      <div className="flex text-xs text-accent font-medium px-4 py-2 items-center">
        <ViewListIcon className="h-4 text-accent mr-2 opacity-50" />
        <span>Waitlist</span>
        <span className="opacity-50 ml-2">1/50</span>
        <button className="btn btn-primary text-xs h-6 ml-auto">
          Add Track
        </button>
      </div>
      {!hidden &&
        queueItems.map((item) => (
          <div key={item.data.id}>
            <TrackFromList
              cover={item.data.cover}
              artists={item.data.artists}
              title={item.data.title}
              avatar={item.data.author.avatar}
            />
          </div>
        ))}
    </div>
  );
};
