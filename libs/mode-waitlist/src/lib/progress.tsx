import React, { useEffect, useState } from 'react';
import { TrackInfo } from './components/track-info';

export const ChannelModeWaitlistProgress = ({
  start,
  duration,
  imageUrl,
  artist,
  name,
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const s = +new Date(+start);
      const now = +new Date();
      setProgress((now - s) / duration);
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, [start]);

  return (
    <TrackInfo
      imageUrl={imageUrl}
      artist={artist}
      name={name}
      progress={progress || 0}
    />
  );
};
