import React, { useEffect, useState } from 'react';
import { TrackInfo } from './track-info';

export const ChannelModeWaitlistProgress = ({
  start = 0,
  startedAt,
  duration,
  imageUrl,
  artist,
  name,
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const s = +new Date(+startedAt);
      const now = +new Date();
      setProgress((now - s + start) / duration);
    }, 50);

    return () => {
      clearInterval(interval);
    };
  }, [startedAt]);

  return (
    <TrackInfo
      imageUrl={imageUrl}
      artist={artist}
      name={name}
      progress={parseFloat(progress.toFixed(6)) || 0}
    />
  );
};
