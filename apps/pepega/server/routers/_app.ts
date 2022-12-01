import { router } from '../trpc';
import { clipRouter } from './clip';

export const appRouter = router({
  clip: clipRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
