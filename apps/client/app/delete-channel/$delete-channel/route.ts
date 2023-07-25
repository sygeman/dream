import { getServerSession } from 'next-auth';
import { prisma } from '../../../libs/prisma';
import { NextResponse } from 'next/server';
import { authOptions } from 'apps/client/helpers/auth-options';

export async function POST(request: Request) {
  const formData = await request.formData();
  const communityName = formData.get('community') as string;
  const channelName = formData.get('channel') as string;

  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  const channel = await prisma.channel.findFirst({
    where: {
      name: channelName,
      community: { name: communityName, ownerId: userId },
    },
  });

  if (!channel) throw 'Channel not found';

  await prisma.channel.delete({ where: { id: channel.id } });

  return NextResponse.json({ done: true });
}
