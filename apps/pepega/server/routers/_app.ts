import { router } from '../trpc';
import { clipRouter } from './clip';
import { clipScoreRouter } from './clip-score';
import { userCoinsRouter } from './user-coins';

export const appRouter = router({
  clip: clipRouter,
  clipScore: clipScoreRouter,
  userCoins: userCoinsRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
