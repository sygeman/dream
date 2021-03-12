import React from 'react';
import { useRouter } from 'next/router';
import SimpleBar from 'simplebar-react';
import { useCommunityChannelsQuery } from '@dream/types';
import { CommunityHeader } from './community-header';
import { ChannelItem } from './channel-item';

export const CommunityLeftPanel = () => {
  const { query } = useRouter();
  const name = typeof query?.community === 'string' && query?.community;

  const communityChannelsQuery = useCommunityChannelsQuery({
    variables: { name },
    skip: !name,
    pollInterval: 2000,
  });

  const channels = communityChannelsQuery?.data?.channels || [];

  return (
    <div className="h-screen flex flex-col flex-shrink-0 w-60 bg-gray-800">
      <CommunityHeader />

      <div className="flex flex-1 w-full overflow-hidden">
        <SimpleBar className="w-full">
          <ChannelItem key="welcome" title="Welcome" />
          {channels.map((channel) => (
            <ChannelItem
              key={channel.id}
              title={channel.title}
              state={channel.state || 'Nothing'}
              online={channel.onlineCount}
              name={channel.name}
            />
          ))}
        </SimpleBar>
      </div>

      <div className="w-full h-12 bg-gray-800 border-t border-gray-900"></div>
    </div>
  );
};
