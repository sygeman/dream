'use server';

import { getCurretUserId } from 'apps/client/helpers/get-current-user';
import { prisma } from 'apps/client/libs/prisma';

export async function createChannelAction(data: {
  title: string;
  name: string;
  community: string;
}) {
  const userId = await getCurretUserId();

  const community = await prisma.community.findUnique({
    where: { name: data.community },
    include: { channels: true },
  });

  if (!community) {
    throw 'Community not found';
  }

  if (community.ownerId !== userId) {
    throw 'Deny';
  }

  if (community.channels.length >= 10) {
    throw 'Channels per community limit';
  }

  const channelWithSameName = await prisma.channel.findFirst({
    where: {
      communityId: community.id,
      name: data.name,
      deleted: false,
    },
  });

  if (channelWithSameName) {
    throw 'Channel with same name is exists in the community';
  }

  const channel = await prisma.channel.create({
    data: {
      title: data.title,
      name: data.name,
      communityId: community.id,
    },
  });

  return { channel };
}
