import React from 'react';
import '@dream/utils/axios';
import { useRouter } from 'next/router';
import {
  useChannelQuery,
  useWaitlistSpotifyQueueQuery,
  useWaitlistSpotifyQueueAddTrackMutation,
  useWaitlistSpotifyQueueSkipTrackMutation,
} from '@dream/types';

export const ChannelModeWaitlistSpotifyQueue = () => {
  const { query } = useRouter();
  const name = typeof query?.channel === 'string' && query?.channel;

  const communityChannelsQuery = useChannelQuery({
    variables: { name },
    skip: !name,
  });

  const channel = communityChannelsQuery?.data?.channel;
  const channelId = channel?.id;

  const waitlistSpotifyQueueQuery = useWaitlistSpotifyQueueQuery({
    variables: { channelId },
    skip: !channelId,
  });

  const waitlistSpotifyQueue =
    waitlistSpotifyQueueQuery?.data?.waitlistSpotifyQueue || [];

  console.log(waitlistSpotifyQueue);

  const [addTrackMutation] = useWaitlistSpotifyQueueAddTrackMutation({
    onCompleted: () => {
      waitlistSpotifyQueueQuery.refetch();
    },
  });
  const addTrack = () => addTrackMutation({ variables: { channelId } });

  const [skipTrackMutation] = useWaitlistSpotifyQueueSkipTrackMutation();
  const skipTrack = () => skipTrackMutation({ variables: { channelId } });

  return (
    <div className="p-4">
      <div className="flex">
        <button className="btn btn-primary" onClick={addTrack}>
          Add Track
        </button>
        <button className="btn btn-secondary ml-2" onClick={skipTrack}>
          Skip
        </button>
      </div>

      <div className="mt-4 text-accent text-sm">
        <div>Queue</div>
        <div>
          {waitlistSpotifyQueue.map((item) => (
            <div key={item?.id}>
              {item?.track?.artists} - {item?.track?.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
