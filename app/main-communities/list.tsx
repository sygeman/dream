'use client';

import { Community } from '@prisma/client';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import React, { useMemo } from 'react';

import { Button } from '@/components/ui/button';
import { useIntl } from '@/libs/intl';

import { CommunityCard } from './card';

type Properties = {
  communities: Community[];
  isUser: boolean;
};

export const MainCommunitiesList = ({ communities, isUser }: Properties) => {
  const searchParameters = useSearchParams();
  const pathname = usePathname();
  const { formatMessage } = useIntl();

  const createCommunityLink = useMemo(() => {
    const nextParameters = new URLSearchParams([...searchParameters.entries()]);

    if (isUser) {
      nextParameters.set('newCommunity', '1');
    } else {
      nextParameters.set('authModal', '1');
    }

    return `${pathname}?${nextParameters?.toString()}`;
  }, [isUser, searchParameters, pathname]);

  return (
    <div className="flex flex-col w-full bg-zinc-900">
      <div className="flex flex-1 w-full overflow-hidden">
        <OverlayScrollbarsComponent className="h-full w-full">
          <div className="flex items-center mt-6 px-6 space-x-4">
            <div className="flex flex-col">
              <span className="text-lg">
                {formatMessage({ id: 'mainTitle' })}
              </span>
              <span className="text-sm text-muted-foreground">
                {formatMessage({ id: 'mainDescription' })}
              </span>
            </div>

            <Link href={createCommunityLink} passHref>
              <Button size={'sm'}>
                {formatMessage({ id: 'mainCreateCommunityButton' })}
              </Button>
            </Link>
          </div>
          <div
            className={clsx(
              'w-full grid auto-rows-max gap-2 justify-center overflow-y-auto',
              'grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'
            )}
          >
            {communities.map((community) => (
              <CommunityCard
                key={community.id}
                name={community.name}
                title={community.title}
                online={0}
              />
            ))}
          </div>
        </OverlayScrollbarsComponent>
      </div>
    </div>
  );
};
