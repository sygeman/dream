import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';

import { ChannelModeWaitlistProgress } from '../components/progress/progress';
import { CurrentMenu } from './menu';

type Properties = {
  current: any;
  muted?: boolean;
  minimal?: boolean;
};

export const ChannelYoutubeModeCurrent = ({
  current,
  muted = false,
  minimal = false,
}: Properties) => {
  const player = useRef<any>(null);
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    const s = +new Date(+current?.startedAt);
    const now = Date.now();
    const start = (now - s) / 1000;

    console.log(start);

    if (isReady && player.current) {
      player.current.seekTo(start, 'seconds');
    }
  }, [current?.startedAt, isReady]);

  return (
    <div className="relative">
      {current ? (
        <div>
          <div
            className={clsx(
              'aspect-w-16 aspect-h-9 z-10',
              minimal && 'absolute'
            )}
          >
            <ReactPlayer
              ref={player}
              url={`https://www.youtube.com/watch?v=${current.videoId}`}
              height="100%"
              width="100%"
              playing
              muted={muted}
              onReady={() => setIsReady(true)}
            />
          </div>
          <div className="h-12 flex items-center px-2">
            <ChannelModeWaitlistProgress
              start={current.startedAt}
              duration={current.duration}
              imageUrl={current.cover}
              name={current.title}
            />
            <div className="flex flex-col text-xs font-medium px-2 opacity-70 text-right ml-auto">
              <div className="text-muted-foreground">from</div>
              <div className="text-white">{current.author.name}</div>
            </div>
            <div className="flex rounded-full overflow-hidden h-8 w-8 bg-background mr-2">
              <img src={current.author.avatar} className="" alt="" />
            </div>
            <CurrentMenu />
          </div>
        </div>
      ) : (
        <div className="flex flex-col px-4">
          <div className="text-md text-white">Nothing is playing now</div>
          <div className="text-sm text-muted-foreground">
            The queue is empty, add some cool video
          </div>
        </div>
      )}
    </div>
  );
};
