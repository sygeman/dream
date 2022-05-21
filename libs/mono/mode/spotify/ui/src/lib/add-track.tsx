import React, { useState } from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useSpotifyModeQueueAddTrackMutation } from './mode-waitlist.api';
import { useCommunityChannel } from '@dream/mono-use-community-channel';

export const ChannelSpotifyModeAddTrack = () => {
  const [trackId, setTrackId] = useState('');
  const router = useRouter();
  const { channelId } = useCommunityChannel();

  const [addTrackMutation] = useSpotifyModeQueueAddTrackMutation({
    onCompleted: () => {
      router.back();
    },
  });

  return (
    <div className="p-4">
      <h2 className="text-accent-light uppercase text-sm font-medium mb-2">
        Add Track To Queue
      </h2>
      <p className="mb-6 text-accent text-sm">
        <input
          type="text"
          className="bg-background text-white text-xs p-2 rounded w-full focus:outline-none focus:ring-1 mb-2"
          placeholder="Paste spotify track link here..."
          onChange={(e) => {
            const trackId = e.target.value.match(/\/track\/([^?]+)/)?.[1];
            setTrackId(trackId);
          }}
        />
      </p>
      <div className="flex w-full justify-end">
        <button
          type="button"
          className={clsx('btn mr-2')}
          onClick={() => router.back()}
        >
          Cancel
        </button>
        {trackId && (
          <button
            type="button"
            className={clsx('btn btn-primary')}
            onClick={() => {
              addTrackMutation({ variables: { channelId, trackId } });
            }}
          >
            Add Track
          </button>
        )}
      </div>
    </div>
  );
};
