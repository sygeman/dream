import {
  useWaitlistYoutubeCurrentQuery,
  useWaitlistYoutubeCurrentUpdatedSubscription,
} from './mode-waitlist.api';
import { ChannelYoutubeModeHistory } from './history';
import { ChannelYoutubeModeQueue } from './queue';
import { ChannelYoutubeModeCurrent } from './current';
import { useCommunityChannel } from '@dream/mono-use-community-channel';
import { YoutubeModeAddVideoModal } from '..';
import { PlayQueueLayout } from '@dream/mono-layouts-play-queue';
import { useState } from 'react';

export const ChannelYoutubeMode = () => {
  const [minimal, setMinimal] = useState(false);
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
    <PlayQueueLayout
      backgroudImageUrl={current?.cover}
      history={<ChannelYoutubeModeHistory />}
      current={
        <ChannelYoutubeModeCurrent current={current} minimal={minimal} />
      }
      queue={<ChannelYoutubeModeQueue />}
      addActionLabel="Add Video"
      addActionModalKey="waitlistYoutubeAddVideo"
      onMinimalContentChanged={setMinimal}
    >
      <YoutubeModeAddVideoModal />
    </PlayQueueLayout>
  );
};
