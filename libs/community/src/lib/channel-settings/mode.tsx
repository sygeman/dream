import React from 'react';
import { useRouter } from 'next/router';
import { ChannelMode, useChannelQuery } from '@dream/types';
import { ChannelModeTwitchStreamSettings } from '@dream/mods/twitch-stream/ui';
import { channelMods } from '../channel-mods';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { ChannelModeCard } from '../channel-mode';

export const ChannelSettingsMode = () => {
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
    switch (channel?.mode) {
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
        {channelMods.map((m) => (
          <ChannelModeCard
            key={m.id}
            color={m.color}
            bgColor={m.bgColor}
            borderColor={m.borderColor}
            icon={m.icon}
            title={m.title}
            selected={mode?.value === m.value}
            active={mode?.value === m.value}
          />
        ))}
      </div>
      <div className="flex flex-1 ml-4">{getSettingsView()}</div>
    </div>
  );
};
