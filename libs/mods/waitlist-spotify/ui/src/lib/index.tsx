import React, { useEffect, useState } from 'react';
import {
  useMeQuery,
  useWaitlistSpotifyCurrentQuery,
  useWaitlistSpotifyCurrentUpdatedSubscription,
  useWaitlistSpotifyUserSyncMutation,
} from '@dream/types';
import { AuthButtonSpotify } from '@dream/auth';
import { Backgroud } from './components/background';
import { ChannelModeWaitlistSpotifyHistory } from './history';
import { ChannelModeWaitlistSpotifyQueue } from './queue';
import { ChannelModeWaitlistSpotifyCurrent } from './current';
import { useChannelId } from './use-channel-id';

const ChannelModeWaitlistSpotifyAuth = () => (
  <div className="absolute left-0 top-0 w-full h-full flex items-center justify-center">
    <div className="flex flex-col">
      <div className="text-sm text-accent mb-2">
        For this mode you need a{' '}
        <a
          href="https://www.spotify.com/premium/"
          target="_blank"
          rel="noreferrer"
          className="text-white underline"
        >
          Spotify Premium
        </a>{' '}
        account
      </div>
      <AuthButtonSpotify />
    </div>
  </div>
);

export const ChannelModeWaitlistSpotify = () => {
  const meQuery = useMeQuery();
  const profiles = meQuery?.data?.me?.profiles || [];
  const hasSpotifyAccount = !!profiles.find((p) => p.provider === 'spotify');

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
      <div
        className="absolute left-0 top-0 w-full h-full flex flex-col"
        style={
          hasSpotifyAccount
            ? undefined
            : {
                filter: 'blur(2px)',
                opacity: 0.5,
              }
        }
      >
        <ChannelModeWaitlistSpotifyHistory />
        <ChannelModeWaitlistSpotifyCurrent
          current={current}
          isConnected={isConnected}
          setIsConnected={setIsConnected}
        />
        <ChannelModeWaitlistSpotifyQueue
          addTrackAccent={isConnected || !current}
        />
      </div>
      {!hasSpotifyAccount && <ChannelModeWaitlistSpotifyAuth />}
    </div>
  );
};
