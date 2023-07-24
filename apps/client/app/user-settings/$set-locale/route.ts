import { getServerSession } from 'next-auth';
import { prisma } from '../../../libs/prisma';
import { NextResponse } from 'next/server';
import { authOptions } from 'apps/client/helpers/auth-options';
import { Locale } from '@prisma/client';

export async function POST(request: Request) {
  const formData = await request.formData();
  const locale = formData.get('locale') as Locale;
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  await prisma.user.update({
    where: { id: userId },
    data: { locale },
  });

  return NextResponse.json({ locale });
}
