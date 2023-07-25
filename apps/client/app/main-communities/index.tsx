import React from 'react';
import { prisma } from 'apps/client/libs/prisma';
import { authOptions } from 'apps/client/helpers/auth-options';
import { getServerSession } from 'next-auth';
import { MainCommunitiesList } from './list';

export const MainCommunities = async () => {
  const session = await getServerSession(authOptions);
  const communities = await prisma.community.findMany({
    where: { deleted: false },
  });
  const isUser = !!session?.user;

  return <MainCommunitiesList communities={communities} isUser={isUser} />;
};
