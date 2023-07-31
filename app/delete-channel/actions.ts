"use server";

import { getCurretUserId } from "@/helpers/get-current-user";
import { prisma } from "@/libs/prisma";

export async function deleteChannelAction(data: {
  channel: string;
  community: string;
}) {
  const userId = await getCurretUserId();

  const channel = await prisma.channel.findFirst({
    where: {
      name: data.channel,
      community: { name: data.community, ownerId: userId },
    },
  });

  if (!channel) throw "Channel not found";

  await prisma.channel.delete({ where: { id: channel.id } });

  return { done: true };
}
