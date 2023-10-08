'use client';
import { PlusCircleIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

type Properties = { isUser: boolean };

export const AppPanelNewCommunity = ({ isUser }: Properties) => {
  const searchParameters = useSearchParams();
  const pathname = usePathname();

  const newCommunityLink = useMemo(() => {
    const newParameters = new URLSearchParams([...searchParameters.entries()]);

    if (isUser) {
      newParameters.set('newCommunity', '1');
    } else {
      newParameters.set('authModal', '1');
    }

    return `${pathname}?${newParameters?.toString()}`;
  }, [isUser, pathname, searchParameters]);

  return (
    <Link href={newCommunityLink} passHref>
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
            'bg-zinc-900 group-hover:bg-primary focus:outline-none text-primary group-hover:text-white'
          )}
        >
          <PlusCircleIcon />
        </button>
      </div>
    </Link>
  );
};
