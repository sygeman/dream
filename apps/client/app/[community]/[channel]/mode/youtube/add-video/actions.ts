'use server';

import { getCurretUserId } from 'apps/client/helpers/get-current-user';
import { prisma } from 'apps/client/libs/prisma';
import { getYoutubeVideo } from 'apps/client/libs/youtube';

export const addVideoAction = async (payload: {
  communityName: string;
  channelName: string;
  videoId: string;
}) => {
  const [userId, video, channel] = await Promise.all([
    getCurretUserId(),
    getYoutubeVideo(payload.videoId),
    prisma.channel.findFirst({
      where: {
        name: payload.channelName,
        community: { name: payload.communityName },
      },
    }),
  ]);

  if (!channel) throw 'Channel not found';
  if (!video) throw 'Video not found';
  if (!userId) throw 'User not found';

  const newItem = await prisma.youtubeModeItem.create({
    data: {
      duration: video.duration_ms, // TODO: Include start, end position
      end: video.duration_ms,
      channel: {
        connect: { id: channel.id },
      },
      author: {
        connect: { id: userId },
      },
      video: {
        connectOrCreate: {
          where: { id: payload.videoId },
          create: {
            id: payload.videoId,
            title: video.title,
            cover: video.cover,
            duration: video.duration_ms,
          },
        },
      },
    },
  });

  // pubsub.publish('waitlistYoutubeQueueUpdated', {
  //   channelId: newItem.channelId,
  //   waitlistYoutubeQueueUpdated: true,
  // });

  // const waitlistYoutubeIsEmpty = await prisma.youtubeMode.findFirst({
  //   where: { channelId, itemId: null },
  // });

  // if (waitlistYoutubeIsEmpty) {
  //   return setVideo({ channelId });
  // }
};
