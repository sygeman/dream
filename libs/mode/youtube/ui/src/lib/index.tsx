import {
  useWaitlistYoutubeCurrentQuery,
  useWaitlistYoutubeCurrentUpdatedSubscription,
} from '@dream/types';
import { Backgroud } from './components/background';
import { ChannelYoutubeModeHistory } from './history';
import { ChannelYoutubeModeQueue } from './queue';
import { ChannelYoutubeModeCurrent } from './current';
import { useCommunityChannel } from '@dream/community';

export const ChannelYoutubeMode = () => {
  const { channelId } = useCommunityChannel();

  const currentQuery = useWaitlistYoutubeCurrentQuery({
    variables: { channelId },
    skip: !channelId,
    fetchPolicy: 'network-only',
  });

  useWaitlistYoutubeCurrentUpdatedSubscription({
    variables: { channelId },
    skip: !channelId,
    onSubscriptionData: () => {
      currentQuery.refetch();
    },
  });

  const current = currentQuery?.data?.waitlistYoutubeCurrent?.item;

  console.log(current);

  return (
    <div className="h-screen w-full flex flex-1 flex-col relative overflow-hidden">
      <Backgroud imageUrl={current?.cover} />
      <div className="absolute left-0 top-0 w-full h-full flex flex-col">
        <ChannelYoutubeModeHistory />
        <ChannelYoutubeModeCurrent current={current} />
        <ChannelYoutubeModeQueue accent />
      </div>
    </div>
  );
};
