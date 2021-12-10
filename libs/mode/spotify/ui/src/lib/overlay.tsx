import React from 'react';
import {
  useSpotifyModeCurrentQuery,
  useSpotifyModeCurrentUpdatedSubscription,
} from '@dream/types';
import { ChannelModeWaitlistProgress } from './components/progress';
import { Backgroud } from './components/background';
import { useCommunityChannel } from '@dream/community';

export const ChannelSpotifyModeOverlay = () => {
  const { channelId } = useCommunityChannel();

  const currentQuery = useSpotifyModeCurrentQuery({
    variables: { channelId },
    skip: !channelId,
    fetchPolicy: 'network-only',
  });

  useSpotifyModeCurrentUpdatedSubscription({
    variables: { channelId },
    skip: !channelId,
    onSubscriptionData: () => {
      currentQuery.refetch();
    },
  });

  const current = currentQuery?.data?.spotifyModeCurrent?.item;

  return (
    <div className="h-screen w-full flex flex-1 flex-col relative overflow-hidden">
      <Backgroud imageUrl={current?.cover} />
      <div className="absolute left-0 bottom-0 w-full flex flex-col">
        <div className="relative h-16">
          <div className="absolute top-0 left-0 h-full w-full opacity-20 bg-surface" />
          <div className="relative h-full">
            <div className="relative h-full flex items-center">
              {current && (
                <>
                  <ChannelModeWaitlistProgress
                    start={current.startedAt}
                    duration={current.duration}
                    imageUrl={current.cover}
                    artist={current.artists}
                    name={current.title}
                  />
                  <div className="flex flex-col text-xs font-medium px-2 opacity-70 text-right ml-2">
                    <div className="text-accent">from</div>
                    <div className="text-white">{current.author.name}</div>
                  </div>
                  <div className="flex shrink-0 rounded-full overflow-hidden h-8 w-8 bg-background mr-4">
                    <img src={current.author.avatar} className="" alt="" />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
