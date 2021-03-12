import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import SimpleBar from 'simplebar-react';
import { HeartIcon } from '@dream/icons/heart';
import { useCommunitiesQuery } from '@dream/types';

const CommunityInAppPanel: React.FC<{
  title: string;
  name: string;
  avatar: string;
}> = ({ title, name, avatar }) => {
  const router = useRouter();
  const community = router.query?.community;

  return (
    <Link href={`/${name}`}>
      <div
        className={`flex flex-shrink-0 items-center justify-center w-12 h-12 cursor-pointer hover:opacity-90 hover:bg-gray-700 ${
          name === community && 'bg-gray-700'
        }`}
      >
        <div className="rounded-full bg-gray-900 h-8 w-8 flex items-center justify-center">
          {avatar ? (
            <img src={avatar} className="h-full" alt={title} />
          ) : (
            <span className="text-gray-400 text-sm">{title[0]}</span>
          )}
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
              avatar={community.avatar}
            />
          ))}
        </SimpleBar>
      </div>
    </>
  );
};
