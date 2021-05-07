import React from 'react';
import { useRouter } from 'next/router';
import { ChannelMode, useChannelQuery } from '@dream/types';
import { ChannelModeTwitchStreamSettings } from '@dream/mods/twitch-stream/ui';
import { channelMods } from '../channel-mods';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';

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
    <div>
      <div className="h-full flex items-center text-sm mb-2">
        <FontAwesomeIcon icon={mode?.icon} className={`${mode?.color} h-4`} />
        <span className="text-white ml-2">{mode?.title}</span>
      </div>
      <div className={clsx('my-2 border-b', mode?.borderColor)}></div>
      {getSettingsView()}
    </div>
  );
};
