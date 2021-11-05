import {
  useWaitlistYoutubeCurrentQuery,
  useWaitlistYoutubeCurrentUpdatedSubscription,
} from '@dream/types';
import { ChannelYoutubeModeCurrent } from './current';
import { Backgroud } from './components/background';
import { useCommunityChannel } from '@dream/community';
import { ChannelModeWaitlistProgress } from './components/progress';

export const ChannelYoutubeModeOverlay = () => {
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
      {/* <Backgroud imageUrl={current?.cover} /> */}
      <div
        className="absolute left-0 top-0 h-full w-full bg-center bg-no-repeat bg-cover transform scale-150"
        style={{ filter: 'blur(24px) brightness(0.1)' }}
      >
        <ChannelYoutubeModeCurrent current={current} muted={true} />
      </div>
      <div className="absolute left-0 bottom-0 w-full flex flex-col">
        <div className="relative h-16">
          <div className="absolute top-0 left-0 h-full w-full opacity-20 bg-surface" />
          <div className="relative h-full">
            <div className="relative h-full flex items-center">
              {current && (
                <>
                  <ChannelModeWaitlistProgress
                    start={current.startedAt}
                    duration={current.duration}
                    imageUrl={current.cover}
                    name={current.title}
                  />
                  <div className="flex flex-col text-xs font-medium px-2 opacity-70 text-right ml-2">
                    <div className="text-accent">from</div>
                    <div className="text-white">{current.author.name}</div>
                  </div>
                  <div className="flex flex-shrink-0 rounded-full overflow-hidden h-8 w-8 bg-background mr-4">
                    <img src={current.author.avatar} className="" alt="" />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>

    // <div className="h-screen w-full flex flex-1 flex-col relative overflow-hidden">
    //   <Backgroud imageUrl={current?.cover} />
    //   <div className="absolute left-0 top-0 w-full h-full flex flex-col">
    //     <ChannelYoutubeModeCurrent current={current} />
    //   </div>
    // </div>
  );
};
