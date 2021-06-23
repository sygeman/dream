import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { UserCircleIcon } from '@heroicons/react/solid';
import { useMeQuery, useUpdateConnectionStatusMutation } from '@dream/types';

const UserPanelForGuest = () => {
  const router = useRouter();

  return (
    <Link
      href={{
        pathname: router.route,
        query: {
          ...router.query,
          authModal: 1,
        },
      }}
      passHref
    >
      <div className="flex items-center justify-center w-12 h-12 cursor-pointer">
        <UserCircleIcon className="text-accent h-5" />
      </div>
    </Link>
  );
};

export const UserPanel = () => {
  const router = useRouter();
  const { query } = router;
  const community =
    typeof query?.community === 'string' ? query?.community : undefined;
  const channel =
    typeof query?.channel === 'string' ? query?.channel : undefined;

  const userQuery = useMeQuery();
  const [updateStatus] = useUpdateConnectionStatusMutation();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const interval = setInterval(() => {
        updateStatus({ variables: { community, channel } });
      }, 4000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [updateStatus, channel, community]);

  const user = userQuery.data?.me;
  const name = user?.name;
  const avatar = user?.avatar;

  if (!user) {
    return <UserPanelForGuest />;
  }

  return (
    <Link
      href={{
        pathname: router.route,
        query: {
          ...router.query,
          userSettings: 'language',
        },
      }}
      passHref
    >
      <a href="replace">
        <div className="flex items-center justify-center w-12 h-12 cursor-pointer">
          <div className="rounded-full h-8 w-8 flex items-center justify-center">
            <img
              src={avatar}
              alt={name}
              className="h-full w-full rounded-full"
            />
          </div>
        </div>
      </a>
    </Link>
  );
};
