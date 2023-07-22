import { prisma } from '../../libs/prisma';
import { CommunityChannels } from './channels/channels';
import { CommunityHeader } from './menu/menu';
import { PropsWithChildren } from 'react';

type Props = {
  params: { community: string };
} & PropsWithChildren;

export async function CommunityLayout({
  params: { community: name },
  children,
}: Props) {
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
      <div className="h-screen flex flex-col shrink-0 w-60 bg-surface">
        <CommunityHeader title={community?.title} />
        <CommunityChannels channels={channels} />
      </div>
      {children}
    </>
  );
}

export default CommunityLayout;
