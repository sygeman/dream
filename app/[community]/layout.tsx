import { PropsWithChildren } from 'react';

import { prisma } from '@/libs/prisma';

import { CommunityChannels } from './channels/channels';
import { CommunityHeader } from './menu/menu';

type Properties = {
  params: { community: string };
} & PropsWithChildren;

async function CommunityLayout({
  params: { community: name },
  children,
}: Properties) {
  const [community, channels] = await prisma.$transaction([
    prisma.community.findFirst({
      where: { name, deleted: false },
    }),
    prisma.channel.findMany({
      where: { deleted: false, community: { name } },
      orderBy: { createdAt: 'asc' },
    }),
  ]);

  return (
    <>
      <div className="h-screen flex flex-col shrink-0 w-60 bg-zinc-900">
        <CommunityHeader title={community?.title} />
        <CommunityChannels channels={channels} />
      </div>
      {children}
    </>
  );
}

export default CommunityLayout;
