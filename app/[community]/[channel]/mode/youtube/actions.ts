'use server';

import { getCurretUserId } from '@/helpers/get-current-user';
import { prisma } from '@/libs/prisma';
import { pusher } from '@/libs/pusher';
import { getYoutubeVideo } from '@/libs/youtube';

// async init(channelId: string) {
//   const waitlistYoutube = await prisma.youtubeMode.findFirst({
//     where: { channelId },
//   });

//   if (waitlistYoutube) return waitlistYoutube;

//   return prisma.youtubeMode.create({
//     data: {
//       channel: { connect: { id: channelId } },
//     },
//   });
// }

// const updateWaitlistState = async ({
//   waitlistId,
//   itemId = null,
//   duration = 0,
// }) => {
//   console.log(`Update waitlist state waitlist:${waitlistId}, item:${itemId}`);

//   const waitlistYoutubeUpdated = await prisma.youtubeMode.update({
//     where: { id: waitlistId },
//     data: { itemId },
//   });

//   if (itemId) {
//     // Create new skip process
//     console.log(`Create new skip process waitlist:${itemId}`);
//     // waitlistYoutubeQueue.add(
//     //   `skip`,
//     //   { itemId },
//     //   { delay: duration, removeOnComplete: true }
//     // );
//     // skipVideoByQueue(itemId);
//   }

//   console.log(
//     `waitlistYoutubeCurrentUpdated - ${waitlistYoutubeUpdated.channelId}`,
//   );

//   // pubsub.publish('waitlistYoutubeCurrentUpdated', {
//   //   channelId: waitlistYoutubeUpdated.channelId,
//   //   waitlistYoutubeCurrentUpdated: true,
//   // });
// };

// const setVideo = async ({ channelId, manualSkip = false }) => {
//   console.log(`setVideo channel:${channelId}`);

//   // Get current state
//   const waitlistYoutube = await prisma.youtubeMode.findFirst({
//     where: { channelId },
//   });

//   if (waitlistYoutube?.itemId) {
//     // Update current item data
//     await prisma.youtubeModeItem.update({
//       where: { id: waitlistYoutube?.itemId },
//       data: { endedAt: new Date(), skipped: manualSkip },
//     });
//   }

//   // Cut first video from queue
//   const item = await prisma.youtubeModeItem.findFirst({
//     where: {
//       channelId,
//       startedAt: null,
//       canceled: false,
//     },
//     include: { video: true },
//     orderBy: { createdAt: 'asc' },
//   });

//   if (!item) {
//     console.log('Queue is empty');
//     // Clear state
//     return updateWaitlistState({ waitlistId: waitlistYoutube?.id });
//   }

//   const itemId = item.id;

//   const updatedItem = await prisma.youtubeModeItem.update({
//     where: { id: itemId },
//     data: { startedAt: new Date() },
//   });

//   pusher.trigger(channelId, 'waitlistYoutubeQueueUpdated', {
//     channelId: updatedItem.channelId,
//     waitlistYoutubeQueueUpdated: true,
//   });

//   pusher.trigger(channelId, 'waitlistYoutubeHistoryUpdated', {
//     channelId: updatedItem.channelId,
//     waitlistYoutubeHistoryUpdated: true,
//   });

//   // return updateWaitlistState({
//   //   waitlistId: waitlistYoutube?.id,
//   //   itemId,
//   //   duration: item?.duration,
//   // });
// };

// @Query(() => YoutubeModeHistory)
//   async waitlistYoutubeHistory(@Args({ name: 'channelId' }) channelId: string) {
//     const historyItems = await prisma.youtubeModeItem.findMany({
//       where: { channel: { id: channelId }, endedAt: { not: null } },
//       orderBy: {
//         createdAt: 'desc',
//       },
//       include: { video: true, author: true },
//       take: 15,
//     });

//     const history = {
//       items: historyItems.reverse().map((item) => ({
//         data: {
//           ...item,
//           cover: item.video.cover,
//           title: item.video.title,
//         },
//         actions: [YoutubeModeHistoryItemAction.ADD_TO_QUEUE],
//       })),
//     };

//     return history;
//   }

//   @Query(() => YoutubeModeCurrent, { nullable: true })
//   async waitlistYoutubeCurrent(@Args({ name: 'channelId' }) channelId: string) {
//     const modeData = await prisma.youtubeMode.findFirst({
//       where: { channel: { id: channelId } },
//       include: {
//         item: { include: { video: true, author: true } },
//       },
//     });

//     if (!modeData?.item) {
//       return null;
//     }

//     const current = {
//       item: {
//         ...modeData.item,
//         cover: modeData.item.video.cover,
//         title: modeData.item.video.title,
//       },
//       actions: [YoutubeModeCurrentAction.SKIP],
//     };

//     return current;
//   }

//   @Query(() => YoutubeModeQueue)
//   async waitlistYoutubeQueue(@Args({ name: 'channelId' }) channelId: string) {
//     const queueItems = await prisma.youtubeModeItem.findMany({
//       where: {
//         channel: { id: channelId },
//         startedAt: null,
//         canceled: false,
//       },
//       include: { video: true, author: true },
//       take: 15,
//     });

//     const queue = {
//       actions: [YoutubeModeQueueAction.ADD_VIDEO],
//       items: queueItems.map((item) => ({
//         data: {
//           ...item,
//           cover: item.video.cover,
//           title: item.video.title,
//         },
//         actions: [YoutubeModeQueueItemAction.CANCEL],
//       })),
//     };

//     return queue;
//   }

export const skipVideoByQueue = async (itemId: string) => {
  console.log('skipTrackByQueue', itemId);

  if (!itemId) return;

  const waitlistYoutube = await prisma.youtubeMode.findFirst({
    where: { itemId },
  });

  if (!waitlistYoutube) return;

  // return setVideo({ channelId: waitlistYoutube.channelId });
};
