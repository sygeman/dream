import { z } from 'zod';
import { router, publicProcedure, authedProcedure } from '../trpc';
import { prisma } from '../../server/prisma';
import { twitch } from '../twitch';

const CHANGE_SCORE_COST = 10;

const getClip = async (clipId: string) => {
  const clipFromDB = await prisma.clip.findUnique({
    where: { id: clipId },
  });

  if (clipFromDB) return clipFromDB;
  const twitchClips = await twitch.clips({ id: clipId, first: 1 });

  if (!twitchClips.data || twitchClips.data.length !== 1) {
    throw new Error(`Clip ${clipId} not found`);
  }

  const twitchClip = twitchClips.data[0];

  return prisma.clip.create({
    data: {
      id: twitchClip.id,
      broadcaster_id: twitchClip.broadcaster_id,
      broadcaster_name: twitchClip.broadcaster_name,
      creator_id: twitchClip.creator_id,
      creator_name: twitchClip.creator_name,
      video_id: twitchClip.video_id,
      game_id: twitchClip.game_id,
      language: twitchClip.language,
      title: twitchClip.title,
      view_count: twitchClip.view_count,
      created_at: twitchClip.created_at,
      thumbnail_url: twitchClip.thumbnail_url,
      duration: twitchClip.duration,
    },
  });
};

export const clipScoreRouter = router({
  byId: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input }) => {
      const clip = await prisma.clip.findUnique({
        where: { id: input.id },
      });

      return clip ? clip.score : 0;
    }),
  increase: authedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(
      async ({
        input: { id: clipId },
        ctx: {
          user: { id: userId },
        },
      }) => {
        await getClip(clipId);
        const count = CHANGE_SCORE_COST;
        const user = await prisma.user.findUnique({ where: { id: userId } });

        if (!user) throw 'User not found';
        if (user.coins < count) throw 'Not enough coins';

        const [_userUpdated, clipUpdated] = await prisma.$transaction([
          prisma.user.update({
            where: { id: userId },
            data: { coins: { decrement: count } },
          }),
          prisma.clip.update({
            where: { id: clipId },
            data: { score: { increment: CHANGE_SCORE_COST } },
          }),
        ]);

        return clipUpdated.score;
      }
    ),
  decrease: authedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(
      async ({
        input: { id: clipId },
        ctx: {
          user: { id: userId },
        },
      }) => {
        await getClip(clipId);
        const count = CHANGE_SCORE_COST;
        const user = await prisma.user.findUnique({ where: { id: userId } });

        if (!user) throw 'User not found';
        if (user.coins < count) throw 'Not enough coins';

        const [_userUpdated, clipUpdated] = await prisma.$transaction([
          prisma.user.update({
            where: { id: userId },
            data: { coins: { decrement: count } },
          }),
          prisma.clip.update({
            where: { id: clipId },
            data: { score: { decrement: CHANGE_SCORE_COST } },
          }),
        ]);

        return clipUpdated.score;
      }
    ),
});
