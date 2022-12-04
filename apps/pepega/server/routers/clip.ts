import { z } from 'zod';
import { Prisma, Clip } from '@prisma/pepega';
import { router, publicProcedure } from '../trpc';
import { prisma } from '../../server/prisma';
import { twitch } from '../twitch';

type ClipFromTwitch = Omit<Clip, 'score' | 'createdAt' | 'updatedAt'>;

/**
 * Default selector for Clip.
 * It's important to always explicitly say which fields you want to return in order to not leak extra information
 * @see https://github.com/prisma/prisma/issues/9353
 */
const defaultClipSelect = Prisma.validator<Prisma.ClipSelect>()({
  id: true,
  title: true,
  thumbnail_url: true,
  language: true,
  broadcaster_id: true,
  creator_id: true,
  video_id: true,
  game_id: true,
  created_at: true,
  score: true,
  createdAt: true,
  updatedAt: true,
});

export const clipRouter = router({
  byId: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input }) => {
      const clipFromDB = await prisma.clip.findUnique({
        where: { id: input.id },
      });

      if (clipFromDB) return clipFromDB;
      const twitchClips = await twitch.clips({ id: input.id, first: 1 });

      if (!twitchClips.data || twitchClips.data.length !== 1) {
        throw new Error(`Clip ${input.id} not found`);
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
    }),
  list: publicProcedure
    .input(
      z.object({
        cursor: z.string().nullish(),
        userId: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      if (!input.userId) {
        const clips = await prisma.clip.findMany({
          select: defaultClipSelect,
          skip: input?.cursor ? 1 : 0,
          cursor: input.cursor ? { id: input.cursor } : undefined,
          orderBy: { score: 'desc' },
          take: 30,
        });

        const clipsCount = clips.length;
        const cursor = clipsCount > 0 ? clips[clipsCount - 1]?.id : null;

        return { clips, cursor };
      }

      const clipsQuery = await twitch.helixGet('clips', {
        broadcaster_id: input.userId,
      });

      const clips: ClipFromTwitch[] = clipsQuery.data.data || [];

      return {
        clips: clips.map((c) => ({ ...c, score: 0 })),
        cursor: (clipsQuery.data.pagination.cursor || '') as string,
      };
    }),
});
