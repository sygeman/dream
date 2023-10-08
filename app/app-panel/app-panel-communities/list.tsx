'use client';

import { Community } from '@prisma/client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { ScrollArea } from '@/components/ui/scroll-area';

import { AppPanelMenuItem } from './menu-item';
import { AppPanelNewCommunity } from './new';

type Properties = { communities: Community[]; isUser: boolean };

export const AppPanelCommunitiesList = ({
  communities,
  isUser,
}: Properties) => {
  const searchParameters = useSearchParams();
  const currentCommunity = searchParameters.get('community');

  return (
    <div className="flex flex-1 w-full overflow-hidden">
      <ScrollArea className="w-full">
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
      </ScrollArea>
    </div>
  );
};
