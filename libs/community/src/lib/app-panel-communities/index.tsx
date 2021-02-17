import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import SimpleBar from 'simplebar-react';
import { HeartIcon } from '@dream/icons/heart';
import { useCommunitiesQuery } from '../api';

const CommunityInAppPanel: React.FC<{ title: string; name: string }> = ({
  title,
  name,
}) => {
  const router = useRouter();
  const community = router.query?.community;

  return (
    <Link href={`/${name}`}>
      <div
        className={`flex flex-shrink-0 items-center justify-center w-48px h-48px cursor-pointer hover:opacity-90 hover:bg-surface-light ${
          name === community && 'bg-surface-light'
        }`}
      >
        <div className="rounded-full bg-background h-32px w-32px flex items-center justify-center">
          <span className="text-gray-400 text-sm">{title[0]}</span>
        </div>
      </div>
    </Link>
  );
};

export const AppPanelCommunities = () => {
  const communitiesQuery = useCommunitiesQuery();
  const communities = communitiesQuery?.data?.communities || [];

  return (
    <>
      <div className="flex justify-center py-2">
        <HeartIcon />
      </div>
      <div className="flex flex-1 w-full overflow-hidden">
        <SimpleBar className="w-full">
          {communities.map((community) => (
            <CommunityInAppPanel
              key={community.id}
              name={community.name}
              title={community.title}
            />
          ))}
        </SimpleBar>
      </div>
    </>
  );
};
