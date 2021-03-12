import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { removeToken } from '@dream/auth';
import { UserCircleIcon } from '@dream/icons/user-circle';
import {
  useMeQuery,
  useLogoutMutation,
  useUpdateConnectionStatusMutation,
} from '@dream/types';

const UserPanelForGuest = () => {
  const router = useRouter();

  return (
    <Link
      as={`/auth?continue=${router.asPath}`}
      href={{
        pathname: router.route,
        query: {
          ...router.query,
          authModal: 1,
          continue: router.asPath,
        },
      }}
      passHref
    >
      <div className="flex items-center justify-center w-12 h-12 bg-surface border-t border-background cursor-pointer">
        <UserCircleIcon />
      </div>
    </Link>
  );
};

export const UserPanel = () => {
  const { query } = useRouter();
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

  const [logout] = useLogoutMutation({
    onCompleted: () => {
      removeToken();
      window.location.reload();
    },
  });

  const user = userQuery.data?.me;
  const name = user?.name;
  const avatar = user?.avatar;

  if (!user) {
    return <UserPanelForGuest />;
  }

  return (
    <div
      className="flex items-center justify-center w-12 h-12 bg-surface border-t border-background cursor-pointer"
      onClick={() => logout()}
    >
      <div className="rounded-full bg-background h-8 w-8 flex items-center justify-center">
        <img src={avatar} alt={name} className="h-full w-full rounded-full" />
      </div>
    </div>
  );
};
