import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import SimpleBar from 'simplebar-react';
import { useIntl } from 'react-intl';
import {
  useCommunitiesQuery,
  useMeQuery,
  useUniqCountQuery,
} from '@dream/types';

const LanguageControl = dynamic(
  () => import('./language').then((m) => m.LanguageControl),
  { ssr: false }
);

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
          <span className="text-sm text-white">{title}</span>
          <span className="text-white text-xs rounded bg-backgorud px-2 py-1">
            {online}
          </span>
        </div>
      </div>
    </Link>
  );
};

export const MainCommunities = () => {
  const intl = useIntl();
  const router = useRouter();
  const userQuery = useMeQuery();
  const user = userQuery?.data?.me;
  const isUser = !!user;

  const communitiesQuery = useCommunitiesQuery({ pollInterval: 3000 });
  const communities = communitiesQuery?.data?.communities || [];

  const uniqCountQuery = useUniqCountQuery({ pollInterval: 3000 });
  const uniqCount = uniqCountQuery?.data?.uniqCount || 0;

  return (
    <div className="flex flex-col w-full">
      <div className="flex w-full justify-between items-center px-4 py-2 bg-surface z-10">
        <div className="flex flex-1">
          <span className="text-accent">
            {intl.formatMessage({ id: 'mainOnlineLabel' })}:
          </span>
          <span className="text-white ml-2">{uniqCount}</span>
        </div>

        <LanguageControl />

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
          <button className="btn btn-primary">
            {intl.formatMessage({ id: 'createCommunityButton' })}
          </button>
        </Link>
      </div>

      <div className="flex flex-1 w-full overflow-hidden">
        <SimpleBar className="h-full w-full">
          <div className="w-full grid grid-cols-1 md:grid-cols-4 py-4 auto-rows-max gap-2 justify-center overflow-y-auto">
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
