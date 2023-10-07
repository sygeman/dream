'use server';

import { getCurretUserId } from '@/helpers/get-current-user';
import { prisma } from '@/libs/prisma';
import { pusher } from '@/libs/pusher';

import { CHANNEL_MESSAGE_CREATED } from './constants';

export const createMessageAction = async (data: {
  channel: string;
  community: string;
  content: string;
}) => {
  const userId = await getCurretUserId();

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
          id: userId,
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
