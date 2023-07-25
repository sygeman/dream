import { getServerSession } from 'next-auth';
import { prisma } from 'apps/client/libs/prisma';
import { NextResponse } from 'next/server';
import { authOptions } from 'apps/client/helpers/auth-options';

export async function POST(request: Request) {
  const formData = await request.formData();
  const title = formData.get('title') as string;
  const name = formData.get('name') as string;
  const communityName = formData.get('community') as string;

  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  const community = await prisma.community.findUnique({
    where: { name: communityName },
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
      name,
      deleted: false,
    },
  });

  if (channelWithSameName) {
    throw 'Channel with same name is exists in the community';
  }

  const channel = await prisma.channel.create({
    data: {
      title,
      name,
      communityId: community.id,
    },
  });

  return NextResponse.json({ channel });
}
