import React from 'react';
import clsx from 'clsx';
import { ClockIcon } from '@heroicons/react/solid';
import {
  useWaitlistSpotifyHistoryQuery,
  useWaitlistSpotifyHistoryUpdatedSubscription,
} from '@dream/types';
import { TrackFromList } from './components/track-from-list';
import { useChannelId } from './use-channel-id';

export const ChannelModeWaitlistSpotifyHistory = ({ hidden = false }) => {
  const channelId = useChannelId();

  const historyQuery = useWaitlistSpotifyHistoryQuery({
    variables: { channelId },
    skip: !channelId,
  });

  useWaitlistSpotifyHistoryUpdatedSubscription({
    variables: { channelId },
    skip: !channelId,
    onSubscriptionData: () => {
      historyQuery.refetch();
    },
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
