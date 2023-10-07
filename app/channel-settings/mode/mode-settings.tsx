import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { ChannelMode } from '@prisma/client';
import React from 'react';

// import { ChannelSpotifyModeSettings } from './spotify/settings';
import { channelMods } from '@/helpers/channel-mods';

import { ChannelTwitchModeSettings } from './twitch/settings';

type Properties = {
  modeKey?: ChannelMode;
  onClose: () => void;
};

export const ModeSettings = ({ modeKey, onClose }: Properties) => {
  const mode = channelMods.find((m) => m?.value === modeKey);

  const getSettingsView = () => {
    switch (modeKey) {
      case ChannelMode.TWITCH: {
        return <ChannelTwitchModeSettings />;
      }
      // case ChannelMode.SPOTIFY:
      //   return <ChannelSpotifyModeSettings />;
      default: {
        return;
      }
    }
  };

  if (!modeKey) return;

  return (
    <div className="flex flex-col flex-1">
      <div className="flex items-center mb-4">
        <button className="btn mr-4" onClick={onClose}>
          <ArrowLeftIcon className="h-5 text-muted-foreground" />
        </button>
        <div className="flex flex-col">
          <span className="text-sm text-white font-medium">{mode?.title}</span>
          <span className="text-xs text-muted-foreground">
            {mode?.description}
          </span>
        </div>
      </div>
      {getSettingsView()}
    </div>
  );
};
