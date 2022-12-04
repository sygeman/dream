import { router, authedProcedure } from '../trpc';
import { prisma } from '../../server/prisma';

export const userCoinsRouter = router({
  getCurrent: authedProcedure.query(async ({ ctx }) => {
    const user = await prisma.user.findUnique({
      where: { id: ctx.user.id },
    });

    return user ? user.coins : 0;
  }),
});
