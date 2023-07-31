"use server";

import { getCurretUserId } from "@/helpers/get-current-user";
import { prisma } from "@/libs/prisma";

export const getCommunitySettingsAction = async (community: string) => {
  const communitySettings = await prisma.community.findFirst({
    where: { name: community, deleted: false },
  });

  if (!communitySettings) throw "Community not found";

  return {
    title: communitySettings.title,
    name: communitySettings.name,
  };
};

export async function updateCommunitySettingsAction(data: {
  title: string;
  name: string;
  community: string;
}) {
  const userId = await getCurretUserId();

  const community = await prisma.community.findFirst({
    where: { name: data.community, deleted: false },
  });

  if (!community) throw "Community not found";
  if (community.ownerId !== userId) throw "Deny";

  const communityWithSameName = await prisma.community.findFirst({
    where: { name: data.name, id: { not: community.id } },
  });

  if (communityWithSameName) {
    throw "Community with same name is exists";
  }

  const communitySettings = await prisma.community.update({
    where: { id: community.id },
    data: { title: data.title, name: data.name },
  });

  return { communitySettings };
}
