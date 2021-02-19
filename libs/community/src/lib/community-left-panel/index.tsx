import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import SimpleBar from 'simplebar-react';
import { useCommunityChannelsQuery, useCommunityQuery } from '../api';

const ChannelItem = ({ name, title, current, online }) => {
  const router = useRouter();
  const community = router.query?.community;
  const channel = router.query?.channel;

  return (
    <Link href={`/${community}/${name}`}>
      <div
        className={`flex items-center flex-1 w-full px-4 py-1 cursor-pointer hover:opacity-95 hover:bg-surface-light ${
          name === channel && 'bg-surface-light'
        }`}
      >
        <div className="flex flex-col flex-1">
          <div className="flex flex-1">
            <span className="text-text text-sm">{title}</span>
          </div>
          <div className="flex flex-1">
            <span className="text-gray-500 text-xs">{current}</span>
          </div>
        </div>

        <div>
          <span className="text-text text-xs rounded bg-background px-2 py-1">
            {online}
          </span>
        </div>
      </div>
    </Link>
  );
};

export const CommunityLeftPanel = () => {
  const { query } = useRouter();
  const name = typeof query?.community === 'string' && query?.community;

  const communityQuery = useCommunityQuery({
    variables: { name },
    skip: !name,
  });

  const communityChannelsQuery = useCommunityChannelsQuery({
    variables: { name },
    skip: !name,
    pollInterval: 2000,
  });

  const community = communityQuery?.data?.community;
  const channels = communityChannelsQuery?.data?.channels || [];

  return (
    <div className="h-screen flex flex-col flex-shrink-0 w-240px bg-surface">
      <Link href={`/${name}`}>
        <div className="flex items-center w-full h-48px px-4 bg-primary hover:opacity-95 cursor-pointer">
          <span className="text-text">{community?.title}</span>
        </div>
      </Link>

      <div className="flex flex-1 w-full overflow-hidden">
        <SimpleBar className="w-full">
          {channels.map((channel) => (
            <ChannelItem
              key={channel.id}
              title={channel.title}
              current={channel.state}
              online={channel.onlineCount}
              name={channel.name}
            />
          ))}
        </SimpleBar>
      </div>

      <div className="w-full h-48px bg-surface border-t border-background"></div>
    </div>
  );
};
