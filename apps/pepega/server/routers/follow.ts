import { router, authedProcedure } from '../trpc';
import { prisma } from '../../server/prisma';
import { twitch } from '../twitch';

export const followRouter = router({
  list: authedProcedure.query(
    async ({
      ctx: {
        user: { id: userId },
      },
    }) => {
      const account = await prisma.account.findFirst({
        where: { userId },
      });

      if (!account) throw 'Account not found';

      const twitchId = account.providerAccountId;

      const query = await twitch.helixGet(
        'users/follows',
        { from_id: twitchId, first: 100 },
        userId
      );

      const channelsIds = query?.data?.data.map(
        (channel: any) => channel.to_id
      );

      const usersQuery = await twitch.helixGet(
        'users',
        { id: channelsIds },
        userId
      );

      return usersQuery.data.data;
    }
  ),
});
