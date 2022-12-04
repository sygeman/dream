import { useAccess } from '../../utils/use-access';
import { User } from './user';
import { Coins } from './coins';
import { AddClip } from './add-clip';
import { signIn } from 'next-auth/react';

export const UserBox = () => {
  const [{ allow: isUser, loading }] = useAccess();

  if (loading) return null;

  if (!isUser) {
    return (
      <>
        <AddClip />
        <button
          className="p-2 text-sm text-white/75 flex items-center justify-center w-full uppercase hover:bg-surface"
          onClick={() => signIn('twitch')}
        >
          Войти
        </button>
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
