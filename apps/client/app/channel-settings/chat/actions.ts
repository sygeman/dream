'use server';

import { authOptions } from 'apps/client/helpers/auth-options';
import { prisma } from 'apps/client/libs/prisma';
import { getServerSession } from 'next-auth';

export const getChannelChatSettingsAction = async (
  community: string,
  channel: string,
) => {
  const channelSettings = await prisma.channel.findFirst({
    where: { name: channel, community: { name: community } },
  });

  if (!channelSettings) throw 'Channel not found';

  return {
    gifAllowed: channelSettings.gifAllowed,
    nsfw: channelSettings.nsfw,
    slowmode: channelSettings.slowmode,
  };
};

export async function updateChannelChatSettingsAction(
  where: { community: string; channel: string },
  data: {
    gifAllowed: boolean;
    nsfw: boolean;
    slowmode: number;
  },
) {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  const channel = await prisma.channel.findFirst({
    where: { name: where.channel, community: { name: where.community } },
    include: { community: true },
  });

  if (!channel) throw 'Channel not found';
  if (channel.community.ownerId !== userId) throw 'Deny';

  const channelSettings = await prisma.channel.update({
    where: { id: channel.id },
    data,
  });

  return { channelSettings };
}
