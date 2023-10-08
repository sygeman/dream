'use client';
import { usePathname, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

import { SettingsLayout } from '@/components/settings/layouts-settings';

import { ChannelSettingsChat } from './chat/chat';
import { ChannelSettingsMode } from './mode/mode';
import { ChannelSettingsOverview } from './overview/overview';

export const ChannelSettingsModal = () => {
  const searchParameters = useSearchParams();
  const pathname = usePathname();

  const deleteChannelLink = useMemo(() => {
    const newParameters = new URLSearchParams([...searchParameters.entries()]);
    newParameters.delete('channelSettings');
    newParameters.set('deleteChannel', '1');
    return `${pathname}?${newParameters?.toString()}`;
  }, [pathname, searchParameters]);

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
              link: deleteChannelLink,
            },
          ],
        },
      ]}
    />
  );
};
