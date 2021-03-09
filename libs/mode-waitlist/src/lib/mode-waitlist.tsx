import React, { useEffect, useState } from 'react';
import useAxios from 'axios-hooks';
import '@dream/utils/axios';
import { useRouter } from 'next/router';
import {
  useChannelQuery,
  useModeWaitlistQuery,
  useModeWaitlistUpdatedSubscription,
} from '@dream/types';
import { ChannelModeWaitlistProgress } from './progress';
import axios from 'axios';

export const ChannelModeWaitlist = () => {
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
    console.log(modeWaitlist?.trackId);

    if (typeof window !== 'undefined' && modeWaitlist?.trackId) {
      const s = +new Date(+modeWaitlist?.start);
      const now = +new Date();

      axios
        .put('https://api.spotify.com/v1/me/player/play', {
          uris: [`spotify:track:${modeWaitlist?.trackId}`],
          position_ms: now - s,
        })
        .then();
    }
  }, [modeWaitlist?.trackId]);

  // const [{ data: trackData }] = useAxios(
  //   `https://api.spotify.com/v1/tracks/${modeWaitlist?.trackId}`
  // );

  // console.log(trackData);

  return (
    <div className="h-screen w-full flex flex-1 flex-col">
      <div className="w-full bg-background h-10">
        <ChannelModeWaitlistProgress
          start={modeWaitlist?.start}
          duration={modeWaitlist?.duration}
        />
      </div>
      <div className="text-white">
        {modeWaitlist?.title} ({modeWaitlist?.start})
      </div>
      {/* <div className="text-white">
        {current} / {modeWaitlist?.duration}
      </div> */}
    </div>
  );
};
