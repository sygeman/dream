import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAccess } from '@dream/pepega/utils-old';
import { Button } from '@dream/pepega/components-old';

export const Header = () => {
  const router = useRouter();
  const [{ allow: isUser, loading }] = useAccess();

  if (loading) return null;

  return (
    <>
      <div className="flex items-center" />
      <div className="flex flex-1 items-center justify-end">
        <div className="h-full flex items-center px-2">
          <div className="flex items-center flex-1 h-full px-1">
            <Link
              as={isUser ? `/newClip` : `/auth?continue=/newClip`}
              href={{
                pathname: router.route,
                query: {
                  ...router.query,
                  [isUser ? 'newClip' : 'authModal']: 1,
                },
              }}
              passHref
            >
              <Button>Предложить клип</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
