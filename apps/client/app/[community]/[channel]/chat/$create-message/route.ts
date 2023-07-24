import { authOptions } from '../../../../../helpers/auth-options';
import { prisma } from '../../../../../libs/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { CHANNEL_MESSAGE_CREATED } from '../constants';
import { pusher } from '../../../../../libs/pusher';

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

  if (!channel) {
    throw 'Channel not found';
  }

  const message = await prisma.channelMessage.create({
    data: {
      content: formData.get('content') as string,
      channel: {
        connect: {
          id: channel.id,
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

  pusher.trigger(channel.id, CHANNEL_MESSAGE_CREATED, message);

  return NextResponse.json({ message });
}
