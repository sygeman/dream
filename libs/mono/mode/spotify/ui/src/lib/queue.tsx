import React from 'react';
import {
  useSpotifyModeQueueQuery,
  useSpotifyModeQueueUpdatedSubscription,
} from './mode-waitlist.api';
import { TrackFromList } from './components/track-from-list';
import { useCommunityChannel } from '@dream/mono-use-community-channel';

export const ChannelSpotifyModeQueue = () => {
  const { channelId } = useCommunityChannel();

  const queueQuery = useSpotifyModeQueueQuery({
    variables: { channelId },
    skip: !channelId,
    fetchPolicy: 'network-only',
  });

  useSpotifyModeQueueUpdatedSubscription({
    variables: { channelId },
    skip: !channelId,
    onSubscriptionData: () => {
      queueQuery.refetch();
    },
  });

  const queueItems = queueQuery?.data?.spotifyModeQueue?.items || [];

  return (
    <>
      {queueItems.map((item) => (
        <div key={item.data.id}>
          <TrackFromList
            cover={item.data.cover}
            artists={item.data.artists}
            title={item.data.title}
            avatar={item.data.author.avatar}
            info={item.data.author.name}
          />
        </div>
      ))}
    </>
  );
};
