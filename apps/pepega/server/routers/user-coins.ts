import { router, authedProcedure } from '../trpc';
import { prisma } from '../../server/prisma';

export const userCoinsRouter = router({
  getCurrent: authedProcedure.query(
    async ({
      ctx: {
        user: { id },
      },
    }) => {
      const user = await prisma.user.findUnique({ where: { id } });
      return user ? user.coins : 0;
    }
  ),
});
