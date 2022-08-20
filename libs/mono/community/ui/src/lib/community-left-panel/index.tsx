import React from 'react';
import { useRouter } from 'next/router';
import { useCommunityChannelsQuery } from '@dream/mono-channel-ui';
import { CommunityHeader } from './community-header';
import { ChannelItem } from './channel-item';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

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
    <div className="h-screen flex flex-col shrink-0 w-60 bg-surface">
      <CommunityHeader />

      <div className="flex flex-1 w-full overflow-hidden">
        <OverlayScrollbarsComponent className="w-full">
          {communityChannelsQuery?.loading ? (
            <>
              {[...Array(8).keys()].map((i) => (
                <div
                  key={i}
                  className="flex flex-1 rounded h-11 bg-surface-dark mx-2 my-1 opacity-20 animate-pulse"
                />
              ))}
            </>
          ) : (
            <>
              <ChannelItem key="welcome" title="Welcome" />
              {channels.map((channel) => (
                <ChannelItem
                  key={channel.id}
                  title={channel.title}
                  state={channel.state}
                  online={channel.onlineCount}
                  name={channel.name}
                />
              ))}
            </>
          )}
        </OverlayScrollbarsComponent>
      </div>

      {/* <div className="w-full h-12 bg-surface border-t border-background"></div> */}
    </div>
  );
};
