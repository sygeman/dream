'use client';

import { Channel } from '@prisma/client';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

import { ChannelItem } from './channel';

type Properties = { channels: Channel[] };

export const CommunityChannels = ({ channels }: Properties) => (
  <div className="flex flex-1 w-full overflow-hidden">
    <OverlayScrollbarsComponent className="w-full">
      <ChannelItem key="welcome" title="Welcome" />
      {channels.map((channel) => (
        <ChannelItem
          key={channel.id}
          title={channel.title}
          // state={channel.state}
          // online={channel.onlineCount}
          name={channel.name}
        />
      ))}
    </OverlayScrollbarsComponent>
  </div>
);
