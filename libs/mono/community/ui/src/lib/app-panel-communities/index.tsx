import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import { HeartIcon } from '@heroicons/react/20/solid';
import { useCommunitiesQuery } from '../community.api';
import { useMeQuery } from '@dream/mono-user-ui';
import { AppPanelMenuItem } from './menu-item';
import { AppPanelNewCommunity } from './new';

export const AppPanelCommunities = () => {
  const router = useRouter();
  const currentCommunity = router.query?.community;
  const communitiesQuery = useCommunitiesQuery();
  const communities = communitiesQuery?.data?.communities || [];

  const userQuery = useMeQuery();
  const user = userQuery?.data?.me;
  const isUser = !!user;

  return (
    <>
      <div className="flex justify-center py-2">
        <HeartIcon className="h-4 text-accent" />
      </div>
      <div className="flex flex-1 w-full overflow-hidden">
        <OverlayScrollbarsComponent className="w-full">
          {communities.map((community) => (
            <Link key={community?.id} href={`/${community?.name}`} passHref>
              <AppPanelMenuItem
                label={community?.title}
                img={community?.avatar}
                selected={community?.name === currentCommunity}
              />
            </Link>
          ))}
          <Link
            href={{
              pathname: router.route,
              query: {
                ...router.query,
                [isUser ? 'newCommunity' : 'authModal']: 1,
              },
            }}
            passHref
          >
            <AppPanelNewCommunity />
          </Link>
        </OverlayScrollbarsComponent>
      </div>
    </>
  );
};
