import React from 'react';
import { HeartIcon } from '@heroicons/react/20/solid';
import { prisma } from '../../../libs/prisma';
import { AppPanelCommunitiesList } from './list';
import { authOptions } from '../../../helpers/auth-options';
import { getServerSession } from 'next-auth';

export const AppPanelCommunities = async () => {
  const session = await getServerSession(authOptions);
  const communities = await prisma.community.findMany({
    where: { deleted: false },
  });
  const isUser = !!session?.user;

  return (
    <>
      <div className="flex justify-center py-2">
        <HeartIcon className="h-4 text-accent" />
      </div>
      <AppPanelCommunitiesList communities={communities} isUser={isUser} />
    </>
  );
};
