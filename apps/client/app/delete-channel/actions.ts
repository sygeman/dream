'use server';

import { authOptions } from 'apps/client/helpers/auth-options';
import { prisma } from 'apps/client/libs/prisma';
import { getServerSession } from 'next-auth';

export async function deleteChannelAction(data: {
  channel: string;
  community: string;
}) {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  const channel = await prisma.channel.findFirst({
    where: {
      name: data.channel,
      community: { name: data.community, ownerId: userId },
    },
  });

  if (!channel) throw 'Channel not found';

  await prisma.channel.delete({ where: { id: channel.id } });

  return { done: true };
}
