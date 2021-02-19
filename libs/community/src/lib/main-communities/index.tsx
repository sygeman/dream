import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import SimpleBar from 'simplebar-react';
import { useCommunitiesQuery, useUniqCountQuery } from '../api';

const CommunityCard: React.FC<{
  title: string;
  name: string;
  online: number;
}> = ({ title, name, online }) => {
  return (
    <Link href={`/${name}`}>
      <div className="flex flex-col flex-shrink-0 overflow-hidden items-center justify-center  cursor-pointer hover:opacity-90 bg-surface m-4 rounded">
        <div className="w-full bg-surface-light py-12"></div>
        <div className="flex items-center justify-between w-full px-4 py-2">
          <span className="text-sm text-text">{title}</span>
          <span className="text-text text-xs rounded bg-background px-2 py-1">
            {online}
          </span>
        </div>
      </div>
    </Link>
  );
};

export const MainCommunities = () => {
  const router = useRouter();
  const isUser = true;

  const communitiesQuery = useCommunitiesQuery({ pollInterval: 3000 });
  const communities = communitiesQuery?.data?.communities || [];

  const uniqCountQuery = useUniqCountQuery({ pollInterval: 3000 });
  const uniqCount = uniqCountQuery?.data?.uniqCount || 0;

  return (
    <div className="flex flex-col w-full">
      <div className="flex w-full justify-between items-center px-4 py-2 bg-surface">
        <div>
          <span className="text-accent">Online:</span>
          <span className="text-white ml-2">{uniqCount}</span>
        </div>
        <Link
          as={isUser ? `/communities/new` : `/auth?continue=/communities/new`}
          href={{
            pathname: router.route,
            query: {
              ...router.query,
              [isUser ? 'newCommunity' : 'authModal']: 1,
            },
          }}
          passHref
        >
          <button className="btn-primary">Create community</button>
        </Link>
      </div>

      <div className="flex flex-1 w-full overflow-hidden">
        <SimpleBar className="h-full w-full">
          <div className="w-full grid grid-cols-fill-240px py-4 auto-rows-max gap-2 justify-center overflow-y-auto">
            {communities.map((community, k) => (
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
