'use server';

import { getCurretUserId } from 'apps/client/helpers/get-current-user';
import { prisma } from 'apps/client/libs/prisma';

export async function deleteCommunityAction(communityName: string) {
  const userId = await getCurretUserId();

  const community = await prisma.community.findUnique({
    where: { name: communityName, ownerId: userId },
  });

  if (!community) throw 'Community not found';

  await prisma.community.delete({ where: { id: community.id } });

  return { done: true };
}
