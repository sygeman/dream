import React, { useState } from 'react';
import clsx from 'clsx';
import { Transition } from '@headlessui/react';
import { useRouter } from 'next/router';
import SimpleBar from 'simplebar-react';
import { useChannelQuery, useSetChannelModeMutation } from '@dream/types';
import { channelMods } from '../channel-mods';
import { ChannelSettingsModeCard } from './mode-card';
import { ModeSettings } from './mode-settings';

export const ChannelSettingsMode = () => {
  const [selectedChannelMode, setSelectedChannelMode] = useState(null);
  const router = useRouter();
  const name =
    typeof router.query?.channel === 'string' && router.query?.channel;

  const communityQuery = useChannelQuery({
    variables: { name },
    skip: !name,
  });

  const [setChannelMode] = useSetChannelModeMutation();

  const channel = communityQuery?.data?.channel;
  const mode = channelMods.find((m) => m?.value === channel?.mode);

  return (
    <div className="flex w-full relative">
      <div className="flex flex-1 w-full overflow-hidden">
        <SimpleBar className="h-full w-full">
          <div
            className={clsx(
              'w-full grid py-4 auto-rows-max gap-2 justify-center overflow-y-auto',
              'grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3'
            )}
          >
            {channelMods.map((m) => (
              <ChannelSettingsModeCard
                key={m?.id}
                mode={m}
                active={mode?.value === m.value}
                openSettings={() => setSelectedChannelMode(m?.value)}
                makeCurrent={() =>
                  setChannelMode({
                    variables: {
                      input: { channelId: channel?.id, mode: m?.value },
                    },
                  })
                }
              />
            ))}
          </div>
        </SimpleBar>
      </div>
      <Transition
        as="div"
        className="absolute h-full w-full bg-surface"
        show={!!selectedChannelMode}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <ModeSettings
          modeKey={selectedChannelMode}
          active={mode?.value === selectedChannelMode}
          onClose={() => setSelectedChannelMode(null)}
          makeCurrent={() =>
            setChannelMode({
              variables: {
                input: { channelId: channel?.id, mode: selectedChannelMode },
              },
            })
          }
        />
      </Transition>
    </div>
  );
};
