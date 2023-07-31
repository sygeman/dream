"use server";

import { SpotifyModeStrategy } from "@prisma/client";
import { getCurretUserId } from "@/helpers/get-current-user";
import { prisma } from "@/libs/prisma";

export const getSpotifyModeSettingsAction = async (
  communityName: string,
  channelName: string
) => {
  const spotifyMode = await prisma.spotifyMode.findFirst({
    where: {
      channel: { name: channelName, community: { name: communityName } },
    },
  });

  return { strategy: spotifyMode?.strategy };
};

export const setSpotifyModeSettingsAction = async (
  where: {
    communityName: string;
    channelName: string;
  },
  data: {
    strategy?: SpotifyModeStrategy | null;
  }
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

  let spotifyMode = await prisma.spotifyMode.findFirst({
    where: { channel: { id: channel.id } },
  });

  if (!spotifyMode) {
    spotifyMode = await prisma.spotifyMode.create({
      data: {
        ...data,
        channel: {
          connect: { id: channel.id },
        },
      },
    });

    return { strategy: spotifyMode.strategy };
  }

  const upsertSpotifyMode = await prisma.spotifyMode.update({
    where: { id: spotifyMode?.id },
    data,
  });

  return { strategy: upsertSpotifyMode.strategy };
};
