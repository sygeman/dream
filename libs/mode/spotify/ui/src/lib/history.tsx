import React from 'react';
import {
  useSpotifyModeHistoryQuery,
  useSpotifyModeHistoryUpdatedSubscription,
} from '@dream/types';
import { TrackFromList } from './components/track-from-list';
import { dateDistanceInWordsToNow } from '@dream/utils/date';
import { useCommunityChannel } from '@dream/community';

export const ChannelSpotifyModeHistory = () => {
  const { channelId } = useCommunityChannel();

  const historyQuery = useSpotifyModeHistoryQuery({
    variables: { channelId },
    skip: !channelId,
  });

  useSpotifyModeHistoryUpdatedSubscription({
    variables: { channelId },
    skip: !channelId,
    onSubscriptionData: () => {
      historyQuery.refetch();
    },
  });

  const historyItems = historyQuery?.data?.spotifyModeHistory?.items || [];

  return (
    <>
      {historyItems.map((item) => (
        <div key={item.data.id}>
          <TrackFromList
            cover={item.data.cover}
            artists={item.data.artists}
            title={item.data.title}
            avatar={item.data.author.avatar}
            info={dateDistanceInWordsToNow(item.data.endedAt)}
            username={item.data.author.name}
          />
        </div>
      ))}
    </>
  );
};
