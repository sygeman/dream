import { useEffect, useState } from 'react';
import { useProjectState } from './state';

export const ProjectCount = () => {
  const [count, setCount] = useState(0);
  const { state } = useProjectState();

  useEffect(() => {
    if (state?.count) setCount(state?.count);
  }, [state?.count]);

  return (
    <div className="my-2 text-lg text-gray-500 h-8 flex items-center">
      <div>Click count: {count}</div>
    </div>
  );
};
