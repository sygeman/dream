import React, { useEffect, useState } from 'react';
import {
  useWaitlistSpotifyCurrentQuery,
  useWaitlistSpotifyCurrentUpdatedSubscription,
  useWaitlistSpotifyUserSyncMutation,
} from '@dream/types';
import { Backgroud } from './components/background';
import { ChannelModeWaitlistSpotifyHistory } from './history';
import { ChannelModeWaitlistSpotifyQueue } from './queue';
import { ChannelModeWaitlistSpotifyCurrent } from './current';
import { useChannelId } from './use-channel-id';

export const ChannelModeWaitlistSpotify = () => {
  const channelId = useChannelId();
  const [isConnected, setIsConnected] = useState(false);

  const [userSyncMutation] = useWaitlistSpotifyUserSyncMutation();
  const syncUserSpotify = () => userSyncMutation({ variables: { channelId } });

  const currentQuery = useWaitlistSpotifyCurrentQuery({
    variables: { channelId },
    skip: !channelId,
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    if (isConnected) {
      syncUserSpotify();
    }
  }, [isConnected]);

  useWaitlistSpotifyCurrentUpdatedSubscription({
    variables: { channelId },
    skip: !channelId,
    onSubscriptionData: () => {
      if (isConnected) {
        syncUserSpotify();
      }
      currentQuery.refetch();
    },
  });

  const current = currentQuery?.data?.waitlistSpotifyCurrent?.item;

  return (
    <div className="h-screen w-full flex flex-1 flex-col relative overflow-hidden">
      <Backgroud imageUrl={current?.cover} />
      <div className="absolute left-0 top-0 w-full h-full flex flex-col">
        <ChannelModeWaitlistSpotifyHistory />
        <ChannelModeWaitlistSpotifyCurrent
          current={current}
          isConnected={isConnected}
          setIsConnected={setIsConnected}
        />
        <ChannelModeWaitlistSpotifyQueue />
      </div>
    </div>
  );
};
