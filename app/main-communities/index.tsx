import React from 'react';

import { checkIsUser } from '@/helpers/get-current-user';
import { prisma } from '@/libs/prisma';

import { MainCommunitiesList } from './list';

export const MainCommunities = async () => {
  const isUser = await checkIsUser();
  const communities = await prisma.community.findMany({
    where: { deleted: false },
  });

  return <MainCommunitiesList communities={communities} isUser={isUser} />;
};
