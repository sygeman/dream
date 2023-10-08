'use client';
import { CogIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import React, { useMemo } from 'react';

import { Button } from '@/components/ui/button';

type Properties = {
  title?: string;
};

export const ChannelHeader = ({ title }: Properties) => {
  const searchParameters = useSearchParams();
  const pathname = usePathname();

  const channelSettingsLink = useMemo(() => {
    const newParameters = new URLSearchParams([...searchParameters.entries()]);
    newParameters.set('channelSettings', 'overview');
    return `${pathname}?${newParameters?.toString()}`;
  }, [pathname, searchParameters]);

  return (
    <div className="flex shrink-0 w-full bg-background-light text-white h-10 px-4">
      <div className="h-full flex flex-1 items-center text-sm">{title}</div>

      <div className="h-full flex items-center ml-4">
        <Link href={channelSettingsLink} passHref>
          <Button variant="ghost" size="sm">
            <CogIcon
              className="w-4 h-4 text-muted-foreground"
              aria-hidden="true"
            />
          </Button>
        </Link>
      </div>
    </div>
  );
};
