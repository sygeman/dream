'use server';

import { authOptions } from 'apps/client/helpers/auth-options';
import { prisma } from 'apps/client/libs/prisma';
import { getServerSession } from 'next-auth';

export async function createChannelAction(data: {
  title: string;
  name: string;
  community: string;
}) {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

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
