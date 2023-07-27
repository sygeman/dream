'use server';

import { authOptions } from 'apps/client/helpers/auth-options';
import { prisma } from 'apps/client/libs/prisma';
import { getServerSession } from 'next-auth';

export async function createCommunityAction(data: {
  title: string;
  name: string;
}) {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

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
