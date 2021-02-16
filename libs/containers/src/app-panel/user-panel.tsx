import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { UserCircleIcon } from '@dream/icons/user-circle';
import { gql, useMutation, useQuery } from '@apollo/client';
import { getRefreshToken } from '@dream/auth';

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
  const userQuery = useQuery(gql`
    query me {
      me {
        id
        name
        profile {
          id
          name
          avatar
        }
      }
    }
  `);

  const [logoutMutation] = useMutation(
    gql`
      mutation logout($refreshToken: String!) {
        logout(refreshToken: $refreshToken)
      }
    `,
    {
      onCompleted: () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.reload();
      },
    }
  );

  const logout = () => {
    logoutMutation({
      variables: {
        refreshToken: getRefreshToken(),
      },
    });
  };

  const user = userQuery.data?.me;
  const name = user?.name;
  const avatar = user?.profile?.avatar;

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
