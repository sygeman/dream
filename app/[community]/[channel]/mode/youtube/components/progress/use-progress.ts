import { useEffect, useState } from 'react';

export const useProgress = (start: number) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const s = +new Date(+start);
      const now = Date.now();
      setProgress(Math.round((now - s) / 1000));
    }, 50);

    return () => {
      clearInterval(interval);
    };
  }, [start]);

  return { progress };
};
