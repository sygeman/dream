import { useEffect } from 'react';
import { useIncrementCountMutation } from './project.api';

interface ProjectClickerProps {
  id?: string;
}

export const ProjectClicker = ({ id }: ProjectClickerProps) => {
  const [incrementCountMutation] = useIncrementCountMutation();

  const incrementCount = () => {
    if (id) {
      incrementCountMutation({ variables: { projectId: id } });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => incrementCount(), 1000);
    return () => clearInterval(interval);
  }, [id]);

  return (
    <button
      className="px-2 p-1 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors delay-75 text-sm font-medium"
      onClick={incrementCount}
    >
      Click me
    </button>
  );
};
