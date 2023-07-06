import React from 'react';
import {
  useSpotifyModeHistoryQuery,
  useSpotifyModeHistoryUpdatedSubscription,
} from './mode-waitlist.api';
import { TrackFromList } from './components/track-from-list';
import { dateDistanceInWordsToNow } from '@dream/mono-utils-date';
import { useCommunityChannel } from '@dream/mono-use-community-channel';

export const ChannelSpotifyModeHistory = () => {
  const { channelId } = useCommunityChannel();

  const historyQuery = useSpotifyModeHistoryQuery({
    variables: { channelId },
    skip: !channelId,
  });

  useSpotifyModeHistoryUpdatedSubscription({
    variables: { channelId },
    skip: !channelId,
    onData: () => {
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
