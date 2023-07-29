'use server';

import { authOptions } from 'apps/client/helpers/auth-options';
import { prisma } from 'apps/client/libs/prisma';
import { getServerSession } from 'next-auth';

export const getChannelSettingsAction = async (
  community: string,
  channel: string,
) => {
  const channelSettings = await prisma.channel.findFirst({
    where: { name: channel, community: { name: community } },
  });

  if (!channelSettings) throw 'Channel not found';

  return {
    title: channelSettings.title,
    name: channelSettings.name,
  };
};

export async function updateChannelSettingsAction(data: {
  title: string;
  name: string;
  community: string;
  channel: string;
}) {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  const channel = await prisma.channel.findFirst({
    where: { name: data.channel, community: { name: data.community } },
    include: { community: true },
  });

  if (!channel) throw 'Channel not found';
  if (channel.community.ownerId !== userId) throw 'Deny';

  const channelWithSameName = await prisma.channel.findFirst({
    where: {
      community: { name: data.community },
      name: data.name,
      id: { not: channel.id },
    },
  });

  if (channelWithSameName) {
    throw 'Channel with same name is exists in the community';
  }

  const channelSettings = await prisma.channel.update({
    where: { id: channel.id },
    data: { title: data.title, name: data.name },
  });

  return { channelSettings };
}
