'use client';
import React, { useMemo } from 'react';
import Link from 'next/link';
import { CogIcon } from '@heroicons/react/20/solid';
import { usePathname, useSearchParams } from 'next/navigation';

type Props = {
  title?: string;
};

export const ChannelHeader = ({ title }: Props) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const channelSettingsLink = useMemo(() => {
    const newParams = new URLSearchParams(Array.from(searchParams.entries()));
    newParams.set('channelSettings', 'overview');
    return `${pathname}?${newParams?.toString()}`;
  }, [searchParams]);

  return (
    <div className="flex shrink-0 w-full bg-background-light text-white h-10 px-4">
      <div className="h-full flex flex-1 items-center text-sm">{title}</div>

      <div className="h-full flex items-center ml-4">
        <Link
          className="h-8 w-8 rounded hover:bg-surface-light flex items-center justify-center"
          href={channelSettingsLink}
          passHref
        >
          <CogIcon className="w-4 h-4 text-accent" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
};
