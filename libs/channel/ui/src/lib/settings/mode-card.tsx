import React from 'react';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CheckCircleIcon } from '@heroicons/react/outline';

export const ChannelSettingsModeCard = ({
  mode,
  active,
  openSettings,
  makeCurrent,
}) => {
  return (
    <div
      className={clsx(
        'flex flex-col flex-shrink-0 overflow-hidden items-center justify-center cursor-pointer',
        'bg-background m-2 rounded-xl',
        'border-2 border-transparent',
        active && `${mode?.borderColor}`
      )}
    >
      <div className="w-full bg-background h-32 flex items-center justify-center text-center relative">
        <div className="flex flex-col">
          <div className="h-6 flex justify-center">
            <FontAwesomeIcon
              icon={mode?.icon}
              className={clsx('h-6', mode?.color && mode?.color)}
            />
          </div>
          <span className="text-sm text-white font-medium mt-2">
            {mode?.title}
          </span>
          <span className="text-xs text-accent">{mode?.description}</span>
        </div>
        {active && (
          <CheckCircleIcon
            className={clsx('h-4 absolute right-2 top-2', mode?.color)}
          />
        )}
      </div>
      <div className="flex items-center justify-end w-full px-2 py-2">
        {active ? (
          <button
            className={clsx(
              'btn w-full',
              mode?.bgColor,
              `hover:${mode?.bgColorLight}`
            )}
            onClick={openSettings}
          >
            Settings
          </button>
        ) : (
          <>
            <button className="btn w-full mr-2" onClick={openSettings}>
              Settings
            </button>
            <button
              className={clsx(
                'btn w-full',
                mode?.bgColor,
                `hover:${mode?.bgColorLight}`
              )}
              onClick={makeCurrent}
            >
              Make Current
            </button>
          </>
        )}
      </div>
    </div>
  );
};
