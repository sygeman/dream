'use server';

import { prisma } from 'apps/client/libs/prisma';

export const getTwitchModeAction = async (
  communityName: string,
  channelName: string,
) => {
  const twitchStream = await prisma.twitchMode.findFirst({
    where: {
      channel: { name: channelName, community: { name: communityName } },
    },
  });

  return twitchStream;
};
