'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Community } from '@prisma/client';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import { AppPanelNewCommunity } from './new';
import { AppPanelMenuItem } from './menu-item';

type Props = { communities: Community[]; isUser: boolean };

export const AppPanelCommunitiesList = ({ communities, isUser }: Props) => {
  const searchParams = useSearchParams();
  const currentCommunity = searchParams.get('community');

  return (
    <div className="flex flex-1 w-full overflow-hidden">
      <OverlayScrollbarsComponent className="w-full">
        {communities.map((community) => (
          <Link key={community?.id} href={`/${community?.name}`} passHref>
            <AppPanelMenuItem
              label={community?.title}
              img={community?.avatar}
              selected={community?.name === currentCommunity}
            />
          </Link>
        ))}

        <AppPanelNewCommunity isUser={isUser} />
      </OverlayScrollbarsComponent>
    </div>
  );
};
