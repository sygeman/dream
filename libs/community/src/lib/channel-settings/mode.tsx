import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { ChannelMode, useChannelQuery } from '@dream/types';
import { ChannelModeTwitchStreamSettings } from '@dream/mods/twitch-stream/ui';
import { channelMods } from '../channel-mods';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CheckCircleIcon } from '@heroicons/react/outline';
import clsx from 'clsx';

export const ChannelSettingsMode = () => {
  const [selectedChannelMode, setSelectedChannelMode] = useState(
    channelMods[0]?.value
  );
  const router = useRouter();
  const name =
    typeof router.query?.channel === 'string' && router.query?.channel;

  const communityQuery = useChannelQuery({
    variables: { name },
    skip: !name,
  });

  const channel = communityQuery?.data?.channel;
  const mode = channelMods.find((m) => m?.value === channel?.mode);

  const getSettingsView = () => {
    switch (selectedChannelMode) {
      case ChannelMode.StreamTwitch:
        return <ChannelModeTwitchStreamSettings />;
      default:
        return null;
    }
  };

  return (
    <div className="flex w-full">
      <div className="flex flex-col w-60">
        <div className="text-accent text-sm">Modes</div>
        {channelMods.map((m) => {
          const selected = selectedChannelMode === m.value;
          const active = mode?.value === m.value;

          return (
            <div
              key={m.id}
              onClick={() => setSelectedChannelMode(m.value)}
              className={clsx(
                'flex w-full bg-backgorud border-2 border-transparent',
                m?.color,
                'text-sm rounded px-4 py-2 my-1 relative overflow-hidden',
                'cursor-pointer',
                selected && `${m?.borderColor}`
              )}
            >
              {selected && (
                <div
                  className={`${m?.bgColor} opacity-5 absolute left-0 top-0 h-full w-full`}
                ></div>
              )}
              <div className="flex items-center z-10 w-full">
                <FontAwesomeIcon
                  icon={m?.icon}
                  className={`${m?.color} mr-2 h-4`}
                />
                <div className="px-2 text-white text-xs flex flex-1">
                  {m?.title}
                </div>
                {active && <CheckCircleIcon className="h-4" />}
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex flex-1 ml-4">{getSettingsView()}</div>
    </div>
  );
};
