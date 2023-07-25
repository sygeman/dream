import { prisma } from 'apps/client/libs/prisma';
import { NextResponse } from 'next/server';
import { authOptions } from 'apps/client/helpers/auth-options';
import { getServerSession } from 'next-auth';

export async function POST(request: Request) {
  const formData = await request.formData();
  const communityName = formData.get('community') as string;
  const title = formData.get('title') as string;
  const name = formData.get('name') as string;

  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  const community = await prisma.community.findFirst({
    where: { name: communityName, deleted: false },
  });

  if (!community) throw 'Community not found';
  if (community.ownerId !== userId) throw 'Deny';

  const communityWithSameName = await prisma.community.findFirst({
    where: { name, id: { not: community.id } },
  });

  if (communityWithSameName) {
    throw 'Community with same name is exists';
  }

  const communitySettings = await prisma.community.update({
    where: { id: community.id },
    data: { title, name },
  });

  return NextResponse.json({ communitySettings });
}
