import React from 'react';
import clsx from 'clsx';
import { ChannelMode } from '@dream/mono-types';
import { ChannelTwitchModeSettings } from '@dream/mono-mode-twitch-ui';
import { ChannelSpotifyModeSettings } from '@dream/mono-mode-spotify-ui';
import { channelMods } from '@dream/mono/utils/channel-mods';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export const ModeSettings: React.FC<{
  active: any;
  modeKey: any;
  onClose: any;
  makeCurrent: any;
}> = ({ active, modeKey, onClose, makeCurrent }) => {
  const mode = channelMods.find((m) => m?.value === modeKey);

  const getSettingsView = () => {
    switch (modeKey) {
      case ChannelMode.Twitch:
        return <ChannelTwitchModeSettings />;
      case ChannelMode.Spotify:
        return <ChannelSpotifyModeSettings />;
      default:
        return null;
    }
  };

  if (!modeKey) {
    return null;
  }

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
        <div className="flex flex-1 justify-end">
          {active ? (
            <div className="bg-surface-light h-8 px-2 text-accent font-medium flex items-center text-sm rounded">
              Current Mode
            </div>
          ) : (
            <button
              className={clsx(
                'btn',
                mode?.bgColor,
                `hover:${mode?.bgColorLight}`
              )}
              onClick={makeCurrent}
            >
              Make Current
            </button>
          )}
        </div>
      </div>
      {getSettingsView()}
    </div>
  );
};
