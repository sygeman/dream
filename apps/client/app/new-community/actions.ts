'use server';

import { getCurretUserId } from 'apps/client/helpers/get-current-user';
import { prisma } from 'apps/client/libs/prisma';

export async function createCommunityAction(data: {
  title: string;
  name: string;
}) {
  const userId = await getCurretUserId();

  if (!userId) throw 'Unauthorized';

  const count = await prisma.community.count({ where: { ownerId: userId } });

  if (count > 3) throw 'Community count limit per user';

  const community = await prisma.community.create({
    data: {
      ...data,
      ownerId: userId,
    },
  });

  return { community };
}
