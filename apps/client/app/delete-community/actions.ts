'use server';

import { authOptions } from 'apps/client/helpers/auth-options';
import { prisma } from 'apps/client/libs/prisma';
import { getServerSession } from 'next-auth';

export async function deleteCommunityAction(communityName: string) {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  const community = await prisma.community.findUnique({
    where: { name: communityName, ownerId: userId },
  });

  if (!community) throw 'Community not found';

  await prisma.community.delete({ where: { id: community.id } });

  return { done: true };
}
