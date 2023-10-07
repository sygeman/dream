import { dateDistanceInWordsToNow } from '@/helpers/date-distance-in-words-to-now';

import { TrackFromList } from '../components/track-from-list';

export const ChannelYoutubeModeHistory = () => {
  // const { channelId } = useCommunityChannel();

  // const historyQuery = useWaitlistYoutubeHistoryQuery({
  //   variables: { channelId },
  //   skip: !channelId,
  // });

  // useWaitlistYoutubeHistoryUpdatedSubscription({
  //   variables: { channelId },
  //   skip: !channelId,
  //   fetchPolicy: 'network-only',
  //   onData: () => {
  //     historyQuery.refetch();
  //   },
  // });

  // const historyItems = historyQuery?.data?.waitlistYoutubeHistory?.items || [];
  const historyItems: any[] = [];

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
