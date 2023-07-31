'use client';
import clsx from 'clsx';
import { PlusCircleIcon } from '@heroicons/react/20/solid';
import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useMemo } from 'react';

type Props = { isUser: boolean };

export const AppPanelNewCommunity = ({ isUser }: Props) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const newCommunityLink = useMemo(() => {
    const newParams = new URLSearchParams(Array.from(searchParams.entries()));

    if (isUser) {
      newParams.set('newCommunity', '1');
    } else {
      newParams.set('authModal', '1');
    }

    return `${pathname}?${newParams?.toString()}`;
  }, [isUser, searchParams]);

  return (
    <Link href={newCommunityLink} passHref>
      <div
        className={clsx(
          'group relative',
          'flex shrink-0 items-center justify-center',
          'w-12 h-12 cursor-pointer',
        )}
      >
        <div
          className={clsx(
            'absolute left-0 border-l h-4',
            'border-transparent group-hover:border-accent',
          )}
        ></div>
        <button
          className={clsx(
            'rounded-full h-8 w-8 p-2 flex items-center justify-center transition-colors',
            'bg-surface group-hover:bg-primary focus:outline-none text-primary group-hover:text-white',
          )}
        >
          <PlusCircleIcon />
        </button>
      </div>
    </Link>
  );
};
