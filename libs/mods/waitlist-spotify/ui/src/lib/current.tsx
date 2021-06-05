import React from 'react';
import { DotsVerticalIcon } from '@heroicons/react/solid';
import { ChannelModeWaitlistProgress } from './components/progress';

export const ChannelModeWaitlistSpotifyCurrent = ({ current }) => {
  return (
    <div className="relative">
      <div className="absolute top-0 left-0 h-full w-full opacity-40 bg-background" />
      <div className="relative">
        <div className="relative">
          {current && (
            <ChannelModeWaitlistProgress
              start={current.startedAt}
              duration={current.duration}
              imageUrl={current.cover}
              artist={current.artists}
              name={current.title}
            />
          )}
          {current && (
            <div className="absolute right-4 top-0 h-full flex items-center">
              <div className="flex flex-col text-xs font-medium px-2 opacity-70 text-right">
                <div className="text-accent">from</div>
                <div className="text-white">{current.author.name}</div>
              </div>
              <div className="flex rounded-full overflow-hidden h-8 w-8 mr-2">
                <img src={current.author.avatar} className="" alt="" />
              </div>
              <button className="h-6 w-6 flex btn p-0 items-center justify-center">
                <DotsVerticalIcon className="h-4 text-accent" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
