'use server';

import { Locale } from '@prisma/client';
import { authOptions } from 'apps/client/helpers/auth-options';
import { prisma } from 'apps/client/libs/prisma';
import { getServerSession } from 'next-auth';

export async function setLocaleAction(locale: Locale) {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  await prisma.user.update({
    where: { id: userId },
    data: { locale },
  });

  return { locale };
}
