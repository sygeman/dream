export const User = ({ name, avatar }: { name?: string; avatar?: string }) => {
  return (
    <div className="flex items-center hover:bg-black/50 py-1 px-2 rounded-lg cursor-pointer text-white/75">
      <div className="mx-2 text-sm font-medium ">{name}</div>
      <img
        src={avatar}
        alt=""
        className="h-8 w-8 rounded-full overflow-hidden"
      />
    </div>
  );
};
