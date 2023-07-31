"use server";

import { ChannelMode } from "@prisma/client";
import { getCurretUserId } from "@/helpers/get-current-user";
import { prisma } from "@/libs/prisma";

export const getChannelModeAction = async (
  communityName: string,
  channelName: string
) => {
  const channel = await prisma.channel.findFirst({
    where: { name: channelName, community: { name: communityName } },
  });

  if (!channel) throw "Channel not found";

  return { mode: channel.mode };
};

export const setChannelModeAction = async (
  where: { communityName: string; channelName: string },
  data: { mode: ChannelMode }
) => {
  const userId = await getCurretUserId();

  const channel = await prisma.channel.findFirst({
    where: {
      name: where.channelName,
      community: { name: where.communityName },
    },
    include: { community: true },
  });

  if (!channel) throw "Channel not found";
  if (channel.community.ownerId !== userId) throw "Deny";

  const channelUpdate = await prisma.channel.update({
    where: { id: channel.id },
    data,
  });

  return { mode: channelUpdate.mode };
};
