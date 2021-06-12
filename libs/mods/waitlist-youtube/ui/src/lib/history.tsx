import clsx from 'clsx';
import { ClockIcon } from '@heroicons/react/solid';
import {
  useWaitlistYoutubeHistoryQuery,
  useWaitlistYoutubeHistoryUpdatedSubscription,
} from '@dream/types';
import { TrackFromList } from './components/track-from-list';
import { useChannelId } from './use-channel-id';
import { dateDistanceInWordsToNow } from '@dream/utils/date';

export const ChannelModeWaitlistYoutubeHistory = ({ hidden = false }) => {
  const channelId = useChannelId();

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
    <div
      className={clsx(
        'flex flex-col flex-shrink-0 justify-end py-2 overflow-hidden',
        !hidden && 'flex-1'
      )}
    >
      {!hidden &&
        historyItems.map((item) => (
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
      <div className="flex text-xs text-accent font-medium px-4 py-2">
        <ClockIcon className="h-4 text-accent mr-2 opacity-50" />
        <span>Previous Plays</span>
      </div>
    </div>
  );
};
