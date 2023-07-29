'use client';
// import {
//   useWaitlistYoutubeCurrentQuery,
//   useWaitlistYoutubeCurrentUpdatedSubscription,
// } from './mode-waitlist.api';
import { ChannelYoutubeModeHistory } from './history';
import { ChannelYoutubeModeQueue } from './queue';
import { ChannelYoutubeModeCurrent } from './current';
// import { useCommunityChannel } from '@dream/mono-use-community-channel';
import { YoutubeModeAddVideoModal } from './modals/add-video';
import { PlayQueueLayout } from 'apps/client/components/play-queue';
import { useMemo, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export const ChannelYoutubeMode = () => {
  const [minimal, setMinimal] = useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const waitlistYoutubeAddVideoLink = useMemo(() => {
    const newParams = new URLSearchParams(Array.from(searchParams.entries()));
    newParams.set('waitlistYoutubeAddVideo', '1');
    return `${pathname}?${newParams?.toString()}`;
  }, [searchParams]);

  // const { channelId } = useCommunityChannel();

  // const currentQuery = useWaitlistYoutubeCurrentQuery({
  //   variables: { channelId },
  //   skip: !channelId,
  //   fetchPolicy: 'network-only',
  // });

  // useWaitlistYoutubeCurrentUpdatedSubscription({
  //   variables: { channelId },
  //   skip: !channelId,
  //   onData: () => {
  //     currentQuery.refetch();
  //   },
  // });

  // const current = currentQuery?.data?.waitlistYoutubeCurrent?.item;
  const current: any = null;

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
      addActionModalLink={waitlistYoutubeAddVideoLink}
      onMinimalContentChanged={setMinimal}
    >
      <YoutubeModeAddVideoModal />
    </PlayQueueLayout>
  );
};
