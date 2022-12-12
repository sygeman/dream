import { router } from '../trpc';
import { clipRouter } from './clip';
import { clipScoreRouter } from './clip-score';
import { userCoinsRouter } from './user-coins';
import { followRouter } from './follow';

export const appRouter = router({
  clip: clipRouter,
  clipScore: clipScoreRouter,
  userCoins: userCoinsRouter,
  follow: followRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
