import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAccess } from '@dream/pepega/auth/ui';

export const AddClip = () => {
  const router = useRouter();
  const [{ allow: isUser, loading }] = useAccess();

  if (loading) return null;

  return (
    <div className="flex w-full px-4">
      <Link
        as={isUser ? `/newClip` : `/auth?continue=/`}
        href={{
          pathname: router.route,
          query: {
            ...router.query,
            [isUser ? 'newClip' : 'authModal']: 1,
          },
        }}
        passHref
      >
        <button className="btn btn-primary w-full font-medium">
          Предложить клип
        </button>
      </Link>
    </div>
  );
};
