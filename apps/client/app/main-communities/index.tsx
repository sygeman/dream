import React from 'react';
import { prisma } from 'apps/client/libs/prisma';
import { MainCommunitiesList } from './list';
import { checkIsUser } from 'apps/client/helpers/get-current-user';

export const MainCommunities = async () => {
  const isUser = await checkIsUser();
  const communities = await prisma.community.findMany({
    where: { deleted: false },
  });

  return <MainCommunitiesList communities={communities} isUser={isUser} />;
};
