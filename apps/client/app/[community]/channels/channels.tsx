'use client';

import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import { Channel } from '@prisma/client';
import { ChannelItem } from './channel';

type Props = { channels: Channel[] };

export const CommunityChannels = ({ channels }: Props) => (
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
