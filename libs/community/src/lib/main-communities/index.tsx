import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import SimpleBar from 'simplebar-react';
import { useCommunitiesQuery, useMeQuery } from '@dream/types';
import { useRouter } from 'next/router';

const CommunityCard: React.FC<{
  title: string;
  name: string;
  online: number;
}> = ({ title, name, online }) => {
  return (
    <Link href={`/${name}`}>
      <div className="flex flex-col shrink-0 overflow-hidden items-center justify-center  cursor-pointer hover:opacity-90 bg-surface-light m-4 rounded">
        <div className="w-full bg-background aspect-w-16 aspect-h-9 relative">
          <div className="absolute h-full w-full flex justify-center items-center overflow-hidden text-accent opacity-25 text-3xl">
            {title}
          </div>
        </div>
        <div className="flex items-center justify-between w-full px-4 py-2 border-t border-surface">
          <span className="text-sm text-white">{title}</span>
          <span className="text-accent text-xs rounded bg-surface px-2 py-1">
            {online}
          </span>
        </div>
      </div>
    </Link>
  );
};

export const MainCommunities = () => {
  const router = useRouter();
  const userQuery = useMeQuery();
  const user = userQuery?.data?.me;
  const isUser = !!user;
  const communitiesQuery = useCommunitiesQuery({ pollInterval: 3000 });
  const communities = communitiesQuery?.data?.communities || [];

  return (
    <div className="flex flex-col w-full bg-surface">
      <div className="flex flex-1 w-full overflow-hidden">
        <SimpleBar className="h-full w-full">
          <div className="flex items-center mt-6 px-6">
            <div className="flex flex-col">
              <span className="text-lg">Communities</span>
              <span className="text-sm text-accent">
                List of all communities
              </span>
            </div>

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
                <button className="btn btn-primary ml-4 h-8">
                  Create Community
                </button>
              </a>
            </Link>
          </div>
          <div
            className={clsx(
              'w-full grid auto-rows-max gap-2 justify-center overflow-y-auto',
              'grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'
            )}
          >
            {communities.map((community) => (
              <CommunityCard
                key={community.id}
                name={community.name}
                title={community.title}
                online={community.onlineCount}
              />
            ))}
          </div>
        </SimpleBar>
      </div>
    </div>
  );
};
