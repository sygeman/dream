export const Skeleton = () => {
  return (
    <div className="flex items-center py-1 px-2 rounded-lg cursor-pointer text-white/75">
      <div className="mx-2 w-16 h-4 bg-black/50 rounded-lg"></div>
      <div className="h-8 w-8 bg-black/50 rounded-full overflow-hidden" />
    </div>
  );
};
