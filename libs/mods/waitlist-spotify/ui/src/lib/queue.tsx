import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  useWaitlistSpotifyQueueQuery,
  useWaitlistSpotifyQueueUpdatedSubscription,
} from '@dream/types';
import { TrackFromList } from './components/track-from-list';
import { ViewListIcon } from '@heroicons/react/solid';
import { useChannelId } from './use-channel-id';

export const ChannelModeWaitlistSpotifyQueue = ({
  hidden = false,
  isConnected,
}) => {
  const router = useRouter();
  const channelId = useChannelId();

  const queueQuery = useWaitlistSpotifyQueueQuery({
    variables: { channelId },
    skip: !channelId,
    fetchPolicy: 'network-only',
  });

  useWaitlistSpotifyQueueUpdatedSubscription({
    variables: { channelId },
    skip: !channelId,
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
        <span className="opacity-50 ml-2">{queueItems?.length}/50</span>
        <Link
          href={{
            pathname: router.route,
            query: {
              ...router.query,
              waitlistSpotifyAddTrack: 1,
            },
          }}
          passHref
        >
          <button
            className={clsx(
              'btn text-xs h-6 ml-auto',
              isConnected ? 'btn-primary' : 'btn-secondary bg-surface'
            )}
          >
            Add Track
          </button>
        </Link>
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
