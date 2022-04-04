import {
  useWaitlistYoutubeHistoryQuery,
  useWaitlistYoutubeHistoryUpdatedSubscription,
} from '@dream/types';
import { TrackFromList } from './components/track-from-list';
import { dateDistanceInWordsToNow } from '@dream/utils/date';
import { useCommunityChannel } from '@dream/community';

export const ChannelYoutubeModeHistory = () => {
  const { channelId } = useCommunityChannel();

  const historyQuery = useWaitlistYoutubeHistoryQuery({
    variables: { channelId },
    skip: !channelId,
  });

  useWaitlistYoutubeHistoryUpdatedSubscription({
    variables: { channelId },
    skip: !channelId,
    fetchPolicy: 'network-only',
    onSubscriptionData: () => {
      historyQuery.refetch();
    },
  });

  const historyItems = historyQuery?.data?.waitlistYoutubeHistory?.items || [];

  return (
    <>
      {historyItems.map((item) => (
        <div key={item.data.id}>
          <TrackFromList
            cover={item.data.cover}
            artists={''}
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
