import { prisma } from "@/libs/prisma";
import { CommunityRightPanel } from "./community-right-panel";
import { ChannelModeContent } from "./mode";
import { ChannelHeader } from "./header";

type Props = {
  params: { community: string; channel: string };
};

async function CommunityChannelPage({ params }: Props) {
  const channel = await prisma.channel.findFirst({
    where: {
      name: params.channel,
      community: {
        name: params.community,
      },
    },
  });

  const messages = await prisma.channelMessage.findMany({
    where: {
      channel: {
        name: params.channel,
        community: {
          name: params.community,
        },
      },
      deleted: false,
      tenorGifId: null,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 50,
    include: {
      user: true,
      tenorGif: true,
    },
  });

  const reversedMessages = [...messages].reverse();

  return (
    <>
      <div className="h-screen w-full flex flex-1 flex-col">
        <ChannelHeader title={channel?.title} />
        <ChannelModeContent mode={channel?.mode} />
      </div>
      {channel && (
        <CommunityRightPanel
          channelId={channel.id}
          messages={reversedMessages}
        />
      )}
    </>
  );
}

export default CommunityChannelPage;
