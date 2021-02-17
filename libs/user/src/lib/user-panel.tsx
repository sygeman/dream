import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { UserCircleIcon } from '@dream/icons/user-circle';
import { getRefreshToken } from '@dream/auth';
import { useMeQuery, useLogoutMutation } from './api';

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
      <div className="flex items-center justify-center w-48px h-48px bg-surface border-t border-background cursor-pointer">
        <UserCircleIcon />
      </div>
    </Link>
  );
};

export const UserPanel = () => {
  const userQuery = useMeQuery();

  const [logoutMutation] = useLogoutMutation({
    onCompleted: () => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      window.location.reload();
    },
  });

  const logout = () => {
    logoutMutation({
      variables: {
        refreshToken: getRefreshToken(),
      },
    });
  };

  const user = userQuery.data?.me;
  const name = user?.name;
  const avatar = user?.avatar;

  if (!user) {
    return <UserPanelForGuest />;
  }

  return (
    <div
      className="flex items-center justify-center w-48px h-48px bg-surface border-t border-background cursor-pointer"
      onClick={logout}
    >
      <div className="rounded-full bg-background h-32px w-32px flex items-center justify-center">
        <img src={avatar} alt={name} className="h-full w-full rounded-full" />
      </div>
    </div>
  );
};
