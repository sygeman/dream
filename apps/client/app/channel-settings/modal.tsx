'use client';
import { SettingsLayout } from 'apps/client/components/settings/layouts-settings';
import { ChannelSettingsOverview } from './overview';
import { ChannelSettingsMode } from './mode';
import { ChannelSettingsChat } from './chat';
import { usePathname, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

export const ChannelSettingsModal = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const deleteChannelLink = useMemo(() => {
    const newParams = new URLSearchParams(Array.from(searchParams.entries()));
    newParams.delete('channelSettings');
    newParams.set('deleteChannel', '1');
    return `${pathname}?${newParams?.toString()}`;
  }, [searchParams]);

  return (
    <SettingsLayout
      id="channelSettings"
      menu={[
        {
          label: 'Channel Settings',
          items: [
            // {
            //   key: 'overview',
            //   label: 'Overview',
            //   content: <ChannelSettingsOverview />,
            // },
            // {
            //   key: 'mode',
            //   label: 'Mode',
            //   content: <ChannelSettingsMode />,
            // },
            // {
            //   key: 'chat',
            //   label: 'Chat',
            //   content: <ChannelSettingsChat />,
            // },
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
