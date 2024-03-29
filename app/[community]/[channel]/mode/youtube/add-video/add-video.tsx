import clsx from 'clsx';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import ReactPlayer from 'react-player';

import { addVideoAction } from './actions';

export const ChannelYoutubeModeAddVideo = () => {
  const [videoId, setVideoId] = useState('');
  const router = useRouter();
  const parameters = useParams();

  const addVideo = async () => {
    addVideoAction({
      communityName: parameters.community as string,
      channelName: parameters.channel as string,
      videoId,
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-muted-foreground-light uppercase text-sm font-medium mb-2">
        Add Video To Queue
      </h2>
      <p className="mb-4 text-muted-foreground text-sm">
        <input
          type="text"
          className="bg-background text-white text-xs p-2 rounded w-full focus:outline-none focus:ring-1 mb-2"
          placeholder="Paste youtube video link here..."
          onChange={(event) => {
            const videoId = event.target.value.match(
              /(.*?)(^|\/|v=)([\w-]{11})(.*)?/i
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
            onClick={addVideo}
          >
            Add Video
          </button>
        )}
      </div>
    </div>
  );
};
