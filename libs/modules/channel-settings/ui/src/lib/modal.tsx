import React from 'react';
import { SettingsLayout } from '@dream/layouts/settings';
import { ChannelSettingsOverview } from './overview';
import { ChannelSettingsMode } from './mode';
import { ChannelSettingsChat } from './chat';

export const ChannelSettingsModal: React.FC = () => {
  return (
    <SettingsLayout
      id="channelSettings"
      menu={[
        {
          label: 'Channel Settings',
          items: [
            {
              key: 'overview',
              label: 'Overview',
              content: <ChannelSettingsOverview />,
            },
            {
              key: 'mode',
              label: 'Mode',
              content: <ChannelSettingsMode />,
            },
            {
              key: 'chat',
              label: 'Chat',
              content: <ChannelSettingsChat />,
            },
          ],
        },
        {
          items: [
            {
              key: 'delete-channel',
              label: 'Delete Channel',
              query: ({ query }) => {
                const { channelSettings, ...q } = query;
                return { ...q, deleteChannel: 1 };
              },
            },
          ],
        },
      ]}
    />
  );
};
