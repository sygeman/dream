"use server";

import { getCurretUserId } from "@/helpers/get-current-user";
import { prisma } from "@/libs/prisma";
import { getYoutubeVideo } from "@/libs/youtube";

export const skipVideoAction = async (payload: {
  communityName: string;
  channelName: string;
}) => {
  console.log("skipVideo", payload);
  // Set next video from queue
  // return setVideo({ channelId, manualSkip: true });
};
