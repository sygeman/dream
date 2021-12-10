import React, { useState } from 'react';
import clsx from 'clsx';
import { Transition } from '@headlessui/react';
import SimpleBar from 'simplebar-react';
import { channelMods } from '../channel-mode';
import { ChannelSettingsModeCard } from './mode-card';
import { ModeSettings } from './mode-settings';
import { useMakeModeCurrent } from './use-make-mode-current';
import { useCommunityChannel } from '../use-community-channel';

export const ChannelSettingsMode = () => {
  const [selectedChannelMode, setSelectedChannelMode] = useState(null);
  const { channel } = useCommunityChannel();

  const currentMode = channelMods.find((m) => m?.value === channel?.mode);

  const { makeModeCurrent } = useMakeModeCurrent();

  return (
    <div className="flex w-full h-full">
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
                active={currentMode?.value === m.value}
                openSettings={() => setSelectedChannelMode(m?.value)}
                makeCurrent={() => makeModeCurrent(m?.value, channel?.id)}
              />
            ))}
          </div>
        </SimpleBar>
      </div>
      <Transition
        as="div"
        className="absolute top-0 left-0 p-4 pt-10 h-full w-full bg-surface"
        show={!!selectedChannelMode}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <ModeSettings
          modeKey={selectedChannelMode}
          active={currentMode?.value === selectedChannelMode}
          onClose={() => setSelectedChannelMode(null)}
          makeCurrent={() => makeModeCurrent(selectedChannelMode, channel?.id)}
        />
      </Transition>
    </div>
  );
};
