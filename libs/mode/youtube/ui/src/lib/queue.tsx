import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  useMeQuery,
  useWaitlistYoutubeQueueQuery,
  useWaitlistYoutubeQueueUpdatedSubscription,
} from '@dream/types';
import { TrackFromList } from './components/track-from-list';
import { ViewListIcon } from '@heroicons/react/solid';
import { useCommunityChannel } from '@dream/community';

export const ChannelYoutubeModeQueue = ({ hidden = false, accent = false }) => {
  const router = useRouter();
  const userQuery = useMeQuery();
  const user = userQuery?.data?.me;
  const isUser = !!user;
  const { channelId } = useCommunityChannel();

  const queueQuery = useWaitlistYoutubeQueueQuery({
    variables: { channelId },
    skip: !channelId,
    fetchPolicy: 'network-only',
  });

  useWaitlistYoutubeQueueUpdatedSubscription({
    variables: { channelId },
    skip: !channelId,
    onSubscriptionData: () => {
      queueQuery.refetch();
    },
  });

  const queueItems = queueQuery?.data?.waitlistYoutubeQueue?.items || [];

  return (
    <div
      className={clsx(
        'flex flex-col shrink-0 justify-start py-2 overflow-hidden',
        !hidden && 'flex-1'
      )}
    >
      <div className="flex text-xs text-accent font-medium px-4 py-2 items-center">
        <ViewListIcon className="h-4 text-accent mr-2 opacity-50" />
        <span>Queue</span>
        <span className="opacity-50 ml-2">{queueItems?.length}/50</span>
        <Link
          href={{
            pathname: router.route,
            query: {
              ...router.query,
              [isUser ? 'waitlistYoutubeAddVideo' : 'authModal']: 1,
            },
          }}
          passHref
        >
          <button
            className={clsx(
              'btn text-xs h-6 ml-auto',
              accent ? 'btn-primary' : 'btn-secondary bg-surface'
            )}
          >
            Add Video
          </button>
        </Link>
      </div>
      {!hidden &&
        queueItems.map((item) => (
          <div key={item.data.id}>
            <TrackFromList
              cover={item.data.cover}
              artists={''}
              title={item.data.title}
              avatar={item.data.author.avatar}
              info={item.data.author.name}
            />
          </div>
        ))}
    </div>
  );
};
