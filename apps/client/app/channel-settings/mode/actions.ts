'use server';

import { ChannelMode } from '@prisma/client';
import { authOptions } from 'apps/client/helpers/auth-options';
import { prisma } from 'apps/client/libs/prisma';
import { getServerSession } from 'next-auth';

export const getChannelModeAction = async (
  communityName: string,
  channelName: string,
) => {
  const channel = await prisma.channel.findFirst({
    where: { name: channelName, community: { name: communityName } },
  });

  if (!channel) throw 'Channel not found';

  return { mode: channel.mode };
};

export const setChannelModeAction = async (
  where: { communityName: string; channelName: string },
  data: { mode: ChannelMode },
) => {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  const channel = await prisma.channel.findFirst({
    where: {
      name: where.channelName,
      community: { name: where.communityName },
    },
    include: { community: true },
  });

  if (!channel) throw 'Channel not found';
  if (channel.community.ownerId !== userId) throw 'Deny';

  const channelUpdate = await prisma.channel.update({
    where: { id: channel.id },
    data,
  });

  return { mode: channelUpdate.mode };
};
