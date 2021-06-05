import React from 'react';
import {
  useWaitlistSpotifyCurrentQuery,
  useWaitlistSpotifyCurrentUpdatedSubscription,
} from '@dream/types';
import { Backgroud } from './components/background';
import { ChannelModeWaitlistSpotifyHistory } from './history';
import { ChannelModeWaitlistSpotifyQueue } from './queue';
import { ChannelModeWaitlistSpotifyCurrent } from './current';
import { useChannelId } from './use-channel-id';

export const ChannelModeWaitlistSpotify = () => {
  const channelId = useChannelId();

  const currentQuery = useWaitlistSpotifyCurrentQuery({
    variables: { channelId },
    skip: !channelId,
    fetchPolicy: 'network-only',
  });

  useWaitlistSpotifyCurrentUpdatedSubscription({
    variables: { channelId },
    skip: !channelId,
    onSubscriptionData: () => {
      currentQuery.refetch();
    },
  });

  const current = currentQuery?.data?.waitlistSpotifyCurrent?.item;

  return (
    <div className="h-screen w-full flex flex-1 flex-col relative overflow-hidden">
      <Backgroud imageUrl={current?.cover} />
      <div className="absolute left-0 top-0 w-full h-full flex flex-col">
        <ChannelModeWaitlistSpotifyHistory />
        <ChannelModeWaitlistSpotifyCurrent current={current} />
        <ChannelModeWaitlistSpotifyQueue />
      </div>
    </div>
  );
};
