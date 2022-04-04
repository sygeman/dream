import React from 'react';
import { dateDistanceInWordsToNow } from '@dream/utils/date';
import { DotsVerticalIcon } from '@heroicons/react/solid';

export const TrackFromList = ({
  cover,
  artists,
  title,
  avatar,
  username = '',
  info = '',
}) => (
  <div className="flex px-4 py-1.5 items-center opacity-70 hover:opacity-100 group">
    <div>
      <img src={cover} className="h-8 w-8" alt="" />
    </div>
    <div className="flex flex-col text-sm px-2">
      <div className="text-sm">{artists}</div>
      <div className="text-sm text-accent">{title}</div>
    </div>
    <div className="flex items-center h-full ml-auto">
      <div className="text-sm px-2 text-accent">{info}</div>
      <div
        className="flex rounded-full overflow-hidden h-6 w-6 bg-surface"
        title={username}
      >
        <img src={avatar} className="" alt="" />
      </div>
      <div className="ml-2">
        <button className="h-6 w-6 flex btn p-0 items-center justify-center opacity-0 group-hover:opacity-100">
          <DotsVerticalIcon className="h-4 text-accent" />
        </button>
      </div>
    </div>
  </div>
);
