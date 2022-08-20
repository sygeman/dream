import { useAccess } from '@dream/pepega/auth/ui';
import { User } from './user';
import { Coins } from './coins';
import { AddClip } from './add-clip';

export const UserBox = () => {
  const [{ allow: isUser, loading }] = useAccess();

  if (loading) return null;

  if (!isUser) {
    return (
      <>
        <AddClip />
        <a
          className="p-2 text-sm text-white/75 flex items-center justify-center w-full uppercase hover:bg-surface"
          href={`/api/auth/twitch?continue=/`}
        >
          Войти
        </a>
      </>
    );
  }

  return (
    <>
      <AddClip />
      <Coins />
      <User />
    </>
  );
};
