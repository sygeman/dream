import { useProjectState } from './state';

export const ProjectCount = () => {
  const { state, loading } = useProjectState();

  const count = state?.count || 0;

  return (
    <div className="my-2 text-lg text-gray-500 h-8 flex items-center">
      {loading ? (
        <div className="h-4 w-32 bg-gray-500/50 rounded" />
      ) : (
        <div>Click count: {count}</div>
      )}
    </div>
  );
};
