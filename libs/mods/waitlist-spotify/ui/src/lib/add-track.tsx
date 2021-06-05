import React from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useWaitlistSpotifyQueueAddTrackMutation } from '@dream/types';
import { useChannelId } from './use-channel-id';

export const ChannelModeWaitlistSpotifyAddTrack = () => {
  const router = useRouter();
  const channelId = useChannelId();

  const [addTrackMutation] = useWaitlistSpotifyQueueAddTrackMutation({
    onCompleted: () => {
      router.back();
    },
  });

  return (
    <div className="p-4">
      <h2 className="text-accent-light uppercase text-sm font-medium mb-2">
        Add Track To Queue
      </h2>
      <p className="mb-6 text-accent text-sm">Search Track Input</p>
      <div className="flex w-full justify-end">
        <button
          type="button"
          className={clsx('btn mr-2')}
          onClick={() => {
            router.back();
          }}
        >
          Cancel
        </button>
        <button
          type="button"
          className={clsx('btn btn-primary')}
          onClick={() => {
            addTrackMutation({ variables: { channelId } });
          }}
        >
          Add Track
        </button>
      </div>
    </div>
  );
};
