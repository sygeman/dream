import React, { useEffect, useState } from 'react';
import {
  useMeQuery,
  useSpotifyModeCurrentQuery,
  useSpotifyModeCurrentUpdatedSubscription,
  useSpotifyModeUserSyncMutation,
} from '@dream/types';
import { AuthButtonSpotify } from '@dream/auth';
import { Backgroud } from './components/background';
import { ChannelSpotifyModeHistory } from './history';
import { ChannelSpotifyModeQueue } from './queue';
import { ChannelSpotifyModeCurrent } from './current';
import { useCommunityChannel } from '@dream/community';

const ChannelSpotifyModeAuth = () => (
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

export const ChannelSpotifyMode = () => {
  const meQuery = useMeQuery();
  const profiles = meQuery?.data?.me?.profiles || [];
  const hasSpotifyAccount = !!profiles.find((p) => p.provider === 'spotify');

  const { channelId } = useCommunityChannel();
  const [isConnected, setIsConnected] = useState(false);

  const [userSyncMutation] = useSpotifyModeUserSyncMutation();
  const syncUserSpotify = () => userSyncMutation({ variables: { channelId } });

  const currentQuery = useSpotifyModeCurrentQuery({
    variables: { channelId },
    skip: !channelId,
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    if (isConnected) {
      syncUserSpotify();
    }
  }, [isConnected]);

  useSpotifyModeCurrentUpdatedSubscription({
    variables: { channelId },
    skip: !channelId,
    onSubscriptionData: () => {
      if (isConnected) {
        syncUserSpotify();
      }
      currentQuery.refetch();
    },
  });

  const current = currentQuery?.data?.spotifyModeCurrent?.item;

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
        <ChannelSpotifyModeHistory />
        <ChannelSpotifyModeCurrent
          current={current}
          isConnected={isConnected}
          setIsConnected={setIsConnected}
        />
        <ChannelSpotifyModeQueue addTrackAccent={isConnected || !current} />
      </div>
      {!hasSpotifyAccount && <ChannelSpotifyModeAuth />}
    </div>
  );
};
