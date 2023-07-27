'use server';

import { prisma } from 'apps/client/libs/prisma';
import { pusher } from 'apps/client/libs/pusher';
import { CHANNEL_MESSAGE_CREATED } from './constants';
import { getServerSession } from 'next-auth';
import { authOptions } from 'apps/client/helpers/auth-options';

export const createMessageAction = async (data: {
  channel: string;
  community: string;
  content: string;
}) => {
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
      name: data.channel,
      community: {
        name: data.community,
      },
    },
  });

  if (!channel) {
    throw 'Channel not found';
  }

  const message = await prisma.channelMessage.create({
    data: {
      content: data.content,
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

  pusher.trigger(channel.id, CHANNEL_MESSAGE_CREATED, message);

  return { message };
};
