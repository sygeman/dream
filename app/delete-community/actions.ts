"use server";

import { getCurretUserId } from "@/helpers/get-current-user";
import { prisma } from "@/libs/prisma";

export async function deleteCommunityAction(communityName: string) {
  const userId = await getCurretUserId();

  const community = await prisma.community.findUnique({
    where: { name: communityName, ownerId: userId },
  });

  if (!community) throw "Community not found";

  await prisma.community.delete({ where: { id: community.id } });

  return { done: true };
}
