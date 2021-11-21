import React from 'react';
import { ChannelMode } from '@dream/types';
import { ChannelTwitchModeSettings } from '@dream/mode/twitch/ui';
import { ChannelSpotifyModeSettings } from '@dream/mode/spotify/ui';
import { channelMods } from '../channel-mode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ArrowLeftIcon } from '@heroicons/react/outline';
import clsx from 'clsx';

export const ModeSettings = ({ active, modeKey, onClose, makeCurrent }) => {
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
        <FontAwesomeIcon
          icon={mode?.icon}
          className={`${mode?.color} h-6 mr-4`}
        />
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
