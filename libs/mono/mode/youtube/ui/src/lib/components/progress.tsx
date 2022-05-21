import { TrackInfo } from 'libs/mode/spotify/ui/src/lib/components/track-info';
import React, { useEffect, useState } from 'react';

const secondsToDurationFormat = (s: number) =>
  new Date(s * 1000).toISOString().substr(11, 8);

export const ChannelModeWaitlistProgress = ({
  start,
  duration,
  imageUrl,
  name,
}) => {
  console.log({ start, duration, imageUrl, name });

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const s = +new Date(+start);
      const now = +new Date();
      setProgress(Math.round((now - s) / 1000));
    }, 50);

    return () => {
      clearInterval(interval);
    };
  }, [start]);

  return (
    <div className="flex relative w-full h-12">
      <div className="flex absolute left-0 bottom-0 w-full">
        <div className="flex items-center justify-center h-12 w-12">
          <img src={imageUrl} alt="" />
        </div>
        <div className="flex flex-1 relative">
          <div
            className="absolute top-0 left-0 h-full opacity-50 bg-background"
            style={{ width: `${progress * 100}%` }}
          />
          <div className="absolute top-0 left-0 h-full w-full flex items-center px-4">
            <div className="flex flex-col">
              <span className="text-sm text-accent font-medium">{name}</span>
              <span className="text-lg text-white">
                <div className="text-xs">
                  <span>{secondsToDurationFormat(progress)}</span>
                  <span className="text-accent px-1">/</span>
                  <span className="text-accent">
                    {secondsToDurationFormat(duration / 1000)}
                  </span>
                </div>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
