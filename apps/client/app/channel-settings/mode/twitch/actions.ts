'use server';

import { authOptions } from 'apps/client/helpers/auth-options';
import { prisma } from 'apps/client/libs/prisma';
import { getServerSession } from 'next-auth';

export const getTwitchModeSettingsAction = async (
  communityName: string,
  channelName: string,
) => {
  const twitchStream = await prisma.twitchMode.findFirst({
    where: {
      channel: { name: channelName, community: { name: communityName } },
    },
  });

  return { channelKey: twitchStream?.channelKey || null };
};

export const setTwitchModeSettingsAction = async (
  where: {
    communityName: string;
    channelName: string;
  },
  data: {
    channelKey: string | null;
  },
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

  let twitchStream = await prisma.twitchMode.findFirst({
    where: { channel: { id: channel.id } },
  });

  if (!twitchStream) {
    twitchStream = await prisma.twitchMode.create({
      data: {
        ...data,
        channel: {
          connect: { id: channel.id },
        },
      },
    });

    return { channelKey: twitchStream.channelKey };
  }

  const upsertTwitchStream = await prisma.twitchMode.update({
    where: { id: twitchStream?.id },
    data,
  });

  return { channelKey: upsertTwitchStream.channelKey };
};
