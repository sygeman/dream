import React from 'react';
import { shortNumbers, humanNumbers } from '@dream/pepega/utils/count';
import {
  useUserCoinsQuery,
  useUserCoinsUpdatedSubscription,
} from '@dream/pepega/user-coin/ui';

interface IProps {
  currency: string;
}

export const WalletBalance: React.FC<IProps> = ({ currency }) => {
  const userCoinsQuery = useUserCoinsQuery();
  const userCoins = userCoinsQuery?.data?.userCoins || 0;

  useUserCoinsUpdatedSubscription({
    onSubscriptionData: ({ subscriptionData }) => {
      if (!subscriptionData.data) return;

      const userCoinsUpdated = subscriptionData.data.userCoinsUpdated;

      userCoinsQuery.updateQuery((prev) => {
        return {
          ...prev,
          userCoins: userCoinsUpdated,
        };
      });
    },
  });

  return <span title={humanNumbers(userCoins)}>{shortNumbers(userCoins)}</span>;
};
