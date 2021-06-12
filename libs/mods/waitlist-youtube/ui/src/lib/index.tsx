import {
  useWaitlistYoutubeCurrentQuery,
  useWaitlistYoutubeCurrentUpdatedSubscription,
} from '@dream/types';
import { Backgroud } from './components/background';
import { ChannelModeWaitlistYoutubeHistory } from './history';
import { ChannelModeWaitlistYoutubeQueue } from './queue';
import { ChannelModeWaitlistYoutubeCurrent } from './current';
import { useChannelId } from './use-channel-id';

export const ChannelModeWaitlistYoutube = () => {
  const channelId = useChannelId();

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
        <ChannelModeWaitlistYoutubeHistory />
        <ChannelModeWaitlistYoutubeCurrent current={current} />
        <ChannelModeWaitlistYoutubeQueue accent />
      </div>
    </div>
  );
};
