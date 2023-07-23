import {
  useWaitlistYoutubeCurrentQuery,
  useWaitlistYoutubeCurrentUpdatedSubscription,
} from '../mode-waitlist.api';
import { ChannelYoutubeModeCurrent } from '../current';
import { useCommunityChannel } from '@dream/mono-use-community-channel';
import { ChannelModeWaitlistProgress } from './progress';

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
    onData: () => {
      currentQuery.refetch();
    },
  });

  const current = currentQuery?.data?.waitlistYoutubeCurrent?.item;

  return (
    <div className="h-screen w-full flex flex-1 flex-col relative overflow-hidden">
      <div
        className="absolute left-0 top-0 h-full w-full bg-center bg-no-repeat bg-cover scale-150"
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
                  <div className="flex flex-col text-sm font-medium px-2 opacity-70 text-right ml-2">
                    <div className="text-accent">from</div>
                    <div className="text-white">{current.author.name}</div>
                  </div>
                  <div className="flex shrink-0 rounded-full overflow-hidden h-10 w-10 bg-background mr-4">
                    {current.author.avatar && (
                      <img src={current.author.avatar} className="" alt="" />
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
