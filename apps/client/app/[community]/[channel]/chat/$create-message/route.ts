import { authOptions } from 'apps/client/helpers/auth-options';
import { prisma } from 'apps/client/libs/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function POST(
  request: Request,
  { params }: { params: { community: string; channel: string } },
) {
  const formData = await request.formData();
  const session = await getServerSession(authOptions);

  // const tenorGifMatch = content.match(
  //   /https\:\/\/tenor\.com\/view(.+)gif-([0-9]+)/
  // );

  // const tenorGifId = tenorGifMatch?.[2];

  // if (tenorGifId) {
  //   await this.tenor.getGif(tenorGifId);
  // }

  const channel = await prisma.channel.findFirst({
    where: {
      name: params.channel,
      community: {
        name: params.community,
      },
    },
  });

  const message = await prisma.channelMessage.create({
    data: {
      content: formData.get('content') as string,
      channel: {
        connect: {
          id: channel?.id,
        },
      },
      user: {
        connect: {
          id: session?.user.id,
        },
      },
      // tenorGif: tenorGifId && {
      //   connect: {
      //     id: tenorGifId,
      //   },
      // },
    },
    include: {
      user: true,
      tenorGif: true,
    },
  });

  // this.pubsub.publish('channelMessageCreated', {
  //   channelMessageCreated: message,
  // });

  return NextResponse.json({ message });
}
