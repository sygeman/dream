import { getServerSession } from 'next-auth';
import { prisma } from '../../../libs/prisma';
import { NextResponse } from 'next/server';
import { authOptions } from 'apps/client/helpers/auth-options';

export async function POST(request: Request) {
  const formData = await request.formData();
  const title = formData.get('title') as string;
  const name = formData.get('name') as string;

  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  if (!userId) throw 'Unauthorized';

  const count = await prisma.community.count({ where: { ownerId: userId } });

  if (count > 3) throw 'Community count limit per user';

  const community = await prisma.community.create({
    data: {
      title,
      name,
      ownerId: userId,
    },
  });

  return NextResponse.json({ community });
}
