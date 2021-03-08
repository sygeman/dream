import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  useChannelQuery,
  useModeWaitlistQuery,
  useModeWaitlistUpdatedSubscription,
} from '@dream/types';

export const ChannelModeWaitlist = () => {
  const [current, setCurrent] = useState(0);

  const { query } = useRouter();
  const name = typeof query?.channel === 'string' && query?.channel;

  const communityChannelsQuery = useChannelQuery({
    variables: { name },
    skip: !name,
  });

  const channel = communityChannelsQuery?.data?.channel;
  const channelId = channel?.id;

  const modeWaitlistQuery = useModeWaitlistQuery({
    variables: { channelId },
    skip: !channelId,
  });

  const modeWaitlist = modeWaitlistQuery?.data?.modeWaitlist;

  useModeWaitlistUpdatedSubscription({
    variables: { channelId },
    skip: !channelId,
    onSubscriptionData: ({ subscriptionData }) => {
      console.log(subscriptionData.data.modeWaitlistUpdated);

      if (!subscriptionData.data) return;

      const modeWaitlistUpdated = subscriptionData.data.modeWaitlistUpdated;

      modeWaitlistQuery.updateQuery((prev) => {
        return {
          ...prev,
          modeWaitlist: {
            ...modeWaitlistUpdated,
          },
        };
      });
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const start = +new Date(+modeWaitlist?.start);
      const now = +new Date();
      setCurrent(now - start);
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, [modeWaitlist?.start]);

  const percentage = (current * 100) / modeWaitlist?.duration;

  return (
    <div className="h-screen w-full flex flex-1 flex-col">
      <div className="w-full bg-background h-10">
        <div
          className="w-full h-full bg-accent"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="text-white">
        {modeWaitlist?.title} ({modeWaitlist?.start})
      </div>
      <div className="text-white">
        {current} / {modeWaitlist?.duration}
      </div>
    </div>
  );
};
