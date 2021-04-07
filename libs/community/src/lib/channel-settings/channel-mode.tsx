import React from 'react';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const ChannelModeCard = ({ color, icon, title, selected = false }) => {
  return (
    <div
      className={clsx(
        'flex w-full bg-backgorud border-2 border-transparent',
        `text-${color}`,
        'text-sm rounded px-4 py-2 my-1 relative overflow-hidden',
        'cursor-pointer',
        selected && `border-${color}-light`
      )}
    >
      {selected && (
        <div
          className={`bg-${color} opacity-5 absolute left-0 top-0 h-full w-full`}
        ></div>
      )}
      <div className="flex items-center z-10">
        <FontAwesomeIcon icon={icon} className={`text-${color} mr-2 h-4`} />
        <div className="px-2 text-white">{title}</div>
      </div>
    </div>
  );
};
