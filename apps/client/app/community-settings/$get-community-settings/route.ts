import { prisma } from '../../../libs/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const formData = await request.formData();
  const communityName = formData.get('community') as string;

  const communitySettings = await prisma.community.findFirst({
    where: { name: communityName, deleted: false },
  });

  return NextResponse.json({ communitySettings });
}
