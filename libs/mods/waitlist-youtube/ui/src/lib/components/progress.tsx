import React, { useEffect, useState } from 'react';

const secondsToDurationFormat = (s: number) =>
  new Date(s * 1000).toISOString().substr(11, 8);

export const ChannelModeWaitlistProgress = ({ start, duration }) => {
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
    <div className="text-sm">
      <span>{secondsToDurationFormat(progress)}</span>
      <span className="text-accent px-1">/</span>
      <span className="text-accent">
        {secondsToDurationFormat(duration / 1000)}
      </span>
    </div>
  );
};
