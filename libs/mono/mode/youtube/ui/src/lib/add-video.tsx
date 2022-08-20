import { useState } from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useWaitlistYoutubeQueueAddVideoMutation } from './mode-waitlist.api';
import ReactPlayer from 'react-player';
import { useCommunityChannel } from '@dream/mono-use-community-channel';

export const ChannelYoutubeModeAddVideo = () => {
  const [videoId, setVideoId] = useState('');
  const router = useRouter();
  const { channelId } = useCommunityChannel();

  const [addVideoMutation] = useWaitlistYoutubeQueueAddVideoMutation({
    onCompleted: () => router.back(),
  });

  return (
    <div className="p-4">
      <h2 className="text-accent-light uppercase text-sm font-medium mb-2">
        Add Video To Queue
      </h2>
      <p className="mb-4 text-accent text-sm">
        <input
          type="text"
          className="bg-background text-white text-xs p-2 rounded w-full focus:outline-none focus:ring-1 mb-2"
          placeholder="Paste youtube video link here..."
          onChange={(e) => {
            const videoId = e.target.value.match(
              /(.*?)(^|\/|v=)([a-z0-9_-]{11})(.*)?/i
            )?.[3];
            setVideoId(videoId || '');
          }}
        />
      </p>
      {videoId && (
        <div className="aspect-w-16 aspect-h-9 z-10 mb-4">
          <ReactPlayer
            height="100%"
            width="100%"
            url={`https://www.youtube.com/watch?v=${videoId}`}
          />
        </div>
      )}
      <div className="flex w-full justify-end">
        <button
          type="button"
          className={clsx('btn mr-2')}
          onClick={() => router.back()}
        >
          Cancel
        </button>
        {videoId && (
          <button
            type="button"
            className={clsx('btn btn-primary')}
            onClick={() => {
              addVideoMutation({ variables: { channelId, videoId } });
            }}
          >
            Add Video
          </button>
        )}
      </div>
    </div>
  );
};
