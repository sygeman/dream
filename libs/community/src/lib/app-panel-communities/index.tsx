import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import SimpleBar from 'simplebar-react';
import { HeartIcon } from '@heroicons/react/solid';
import { useCommunitiesQuery, useMeQuery } from '@dream/types';
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
        <SimpleBar className="w-full">
          {communities.map((community) => (
            <Link key={community?.id} href={`/${community?.name}`} passHref>
              <a href="repalce">
                <AppPanelMenuItem
                  label={community?.title}
                  img={community?.avatar}
                  selected={community?.name === currentCommunity}
                />
              </a>
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
            <a href="repalce">
              <AppPanelNewCommunity />
            </a>
          </Link>
        </SimpleBar>
      </div>
    </>
  );
};
