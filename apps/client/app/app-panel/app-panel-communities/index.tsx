import React from 'react';
import { HeartIcon } from '@heroicons/react/20/solid';
import { prisma } from 'apps/client/libs/prisma';
import { AppPanelCommunitiesList } from './list';
import { checkIsUser } from 'apps/client/helpers/get-current-user';

export const AppPanelCommunities = async () => {
  const isUser = await checkIsUser();

  const communities = await prisma.community.findMany({
    where: { deleted: false },
  });

  return (
    <>
      <div className="flex justify-center py-2">
        <HeartIcon className="h-4 text-accent" />
      </div>
      <AppPanelCommunitiesList communities={communities} isUser={isUser} />
    </>
  );
};
