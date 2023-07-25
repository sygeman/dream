import { getServerSession } from 'next-auth';
import { prisma } from '../../../libs/prisma';
import { NextResponse } from 'next/server';
import { authOptions } from 'apps/client/helpers/auth-options';

export async function POST(request: Request) {
  const formData = await request.formData();
  const communityName = formData.get('community') as string;

  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  const community = await prisma.community.findUnique({
    where: { name: communityName, ownerId: userId },
  });

  if (!community) throw 'Community not found';

  await prisma.community.delete({ where: { id: community.id } });

  return NextResponse.json({ done: true });
}
