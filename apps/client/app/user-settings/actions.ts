'use server';

import { Locale } from '@prisma/client';
import { getCurretUserId } from 'apps/client/helpers/get-current-user';
import { prisma } from 'apps/client/libs/prisma';

export async function setLocaleAction(locale: Locale) {
  const userId = await getCurretUserId();

  const user = await prisma.user.update({
    where: { id: userId },
    data: { locale },
  });

  return { locale: user?.locale };
}
