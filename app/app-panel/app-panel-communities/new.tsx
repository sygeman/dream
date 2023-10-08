'use client';
import { PlusCircleIcon } from '@heroicons/react/20/solid';
import cn from 'clsx';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

import { Button } from '@/components/ui/button';

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
        className={cn(
          'group relative',
          'flex shrink-0 items-center justify-center',
          'w-12 h-12 cursor-pointer'
        )}
      >
        <div
          className={cn(
            'absolute left-0 border-l h-4',
            'border-transparent group-hover:border-accent'
          )}
        />
        <Button variant="ghost" className="rounded-full h-8 w-8">
          <PlusCircleIcon className="h-4 w-4 flex shrink-0" />
        </Button>
      </div>
    </Link>
  );
};
