import { useMeQuery } from './auth.api';

const Guest = () => {
  return (
    <div>
      <a href={`/api/auth/twitch?continue=/`}>
        <button className="px-2 p-1 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors delay-75 text-sm font-medium">
          Login with Twitch
        </button>
      </a>
    </div>
  );
};

const Skeleton = () => {
  return (
    <div className="flex items-center py-1 px-2 rounded-lg cursor-pointer text-white/75">
      <div className="mx-2 w-16 h-4 bg-black/50 rounded-lg"></div>
      <div className="h-8 w-8 bg-black/50 rounded-full overflow-hidden" />
    </div>
  );
};

const User = ({ name, avatar }: { name?: string; avatar?: string }) => {
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

export function NavProfile() {
  const meQuery = useMeQuery();
  const user = meQuery?.data?.me;

  if (meQuery?.loading) return <Skeleton />;
  if (!user) return <Guest />;

  return <User name={user?.name || ''} avatar={user?.avatar || ''} />;
}
