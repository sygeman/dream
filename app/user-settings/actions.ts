'use server';

import { Locale } from '@prisma/client';

import { getCurretUserId } from '@/helpers/get-current-user';
import { prisma } from '@/libs/prisma';

export async function setLocaleAction(locale: Locale) {
  const userId = await getCurretUserId();

  const user = await prisma.user.update({
    where: { id: userId },
    data: { locale },
  });

  return { locale: user?.locale };
}
