'use server';

import { getCurretUserId } from '@/helpers/get-current-user';
import { prisma } from '@/libs/prisma';

export const getTwitchModeSettingsAction = async (
  communityName: string,
  channelName: string
) => {
  const twitchStream = await prisma.twitchMode.findFirst({
    where: {
      channel: { name: channelName, community: { name: communityName } },
    },
  });

  return { channelKey: twitchStream?.channelKey || undefined };
};

export const setTwitchModeSettingsAction = async (
  where: {
    communityName: string;
    channelName: string;
  },
  data: {
    channelKey: string | undefined;
  }
) => {
  const userId = await getCurretUserId();

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

    return { channelKey: twitchStream.channelKey || undefined };
  }

  const upsertTwitchStream = await prisma.twitchMode.update({
    where: { id: twitchStream?.id },
    data,
  });

  return { channelKey: upsertTwitchStream.channelKey || undefined };
};
