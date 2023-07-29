import React from 'react';
import { ChannelTwitchModeSettings } from './twitch/settings';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { ChannelMode } from '@prisma/client';
import { ChannelSpotifyModeSettings } from './spotify/settings';
import { channelMods } from 'apps/client/helpers/channel-mods';

type Props = {
  modeKey: ChannelMode | null;
  onClose: () => void;
};

export const ModeSettings = ({ modeKey, onClose }: Props) => {
  const mode = channelMods.find((m) => m?.value === modeKey);

  const getSettingsView = () => {
    switch (modeKey) {
      case ChannelMode.TWITCH:
        return <ChannelTwitchModeSettings />;
      case ChannelMode.SPOTIFY:
        return <ChannelSpotifyModeSettings />;
      default:
        return null;
    }
  };

  if (!modeKey) return null;

  return (
    <div className="flex flex-col flex-1">
      <div className="flex items-center mb-4">
        <button className="btn mr-4" onClick={onClose}>
          <ArrowLeftIcon className="h-5 text-accent" />
        </button>
        <div className="flex flex-col">
          <span className="text-sm text-white font-medium">{mode?.title}</span>
          <span className="text-xs text-accent">{mode?.description}</span>
        </div>
      </div>
      {getSettingsView()}
    </div>
  );
};
