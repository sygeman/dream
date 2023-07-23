import { prisma } from '../../../libs/prisma';
import { CommunityRightPanel } from './community-right-panel';
import { ChannelContent } from './content';
import { ChannelHeader } from './header';

type Props = {
  params: { community: string; channel: string };
};

export async function CommunityChannelPage({ params }: Props) {
  const channel = await prisma.channel.findFirst({
    where: {
      name: params.channel,
      community: {
        name: params.community,
      },
    },
  });

  return (
    <>
      <div className="h-screen w-full flex flex-1 flex-col">
        <ChannelHeader title={channel?.title} />
        <ChannelContent mode={channel?.mode} />
      </div>
      {channel && <CommunityRightPanel channelId={channel.id} />}
    </>
  );
}

export default CommunityChannelPage;
