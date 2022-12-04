import { CoinIconGold } from '../../components/coin-icon';
import { shortNumbers, humanNumbers } from '../../utils/count';
import { trpc } from '../../utils/trpc';

export const Coins = () => {
  const userCoinsQuery = trpc.userCoins.getCurrent.useQuery();
  const userCoins = userCoinsQuery?.data || 0;

  // useUserCoinsUpdatedSubscription({
  //   onSubscriptionData: ({ subscriptionData }) => {
  //     if (!subscriptionData.data) return;

  //     const userCoinsUpdated = subscriptionData.data.userCoinsUpdated;

  //     userCoinsQuery.updateQuery((prev) => {
  //       return {
  //         ...prev,
  //         userCoins: userCoinsUpdated,
  //       };
  //     });
  //   },
  // });

  return (
    <div className="flex items-center justify-center h-10 w-full text-sm font-medium text-white/90">
      <CoinIconGold />
      <span title={humanNumbers(userCoins)}>{shortNumbers(userCoins)}</span>
    </div>
  );
};
