import React from 'react';
import clsx from 'clsx';
import { PlusCircleIcon } from '@heroicons/react/solid';

export const AppPanelNewCommunity: React.FC = () => {
  return (
    <div
      className={clsx(
        'group relative',
        'flex shrink-0 items-center justify-center',
        'w-12 h-12 cursor-pointer'
      )}
    >
      <div
        className={clsx(
          'absolute left-0 border-l h-4',
          'border-transparent group-hover:border-accent'
        )}
      ></div>
      <button
        className={clsx(
          'rounded-full h-8 w-8 p-2 flex items-center justify-center transition-colors',
          'bg-surface group-hover:bg-primary focus:outline-none text-primary group-hover:text-white'
        )}
      >
        <PlusCircleIcon />
      </button>
    </div>
  );
};
