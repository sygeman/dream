import { HeartIcon } from '@heroicons/react/20/solid';
import React from 'react';

import { checkIsUser } from '@/helpers/get-current-user';
import { prisma } from '@/libs/prisma';

import { AppPanelCommunitiesList } from './list';

export const AppPanelCommunities = async () => {
  const isUser = await checkIsUser();

  const communities = await prisma.community.findMany({
    where: { deleted: false },
  });

  return (
    <>
      <div className="flex justify-center py-2">
        <HeartIcon className="h-4 text-muted-foreground" />
      </div>
      <AppPanelCommunitiesList communities={communities} isUser={isUser} />
    </>
  );
};
