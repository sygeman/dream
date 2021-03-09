import React, { useEffect, useState } from 'react';

export const ChannelModeWaitlistProgress = ({ start, duration }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const s = +new Date(+start);
      const now = +new Date();
      setCurrent(now - s);
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, [start]);

  const percentage = (current * 100) / duration;

  return (
    <div
      className="w-full h-full bg-accent"
      style={{ width: `${percentage}%` }}
    ></div>
  );
};
