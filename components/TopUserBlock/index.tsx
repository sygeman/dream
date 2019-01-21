import { FC } from 'react';
import UserProvider from '../../providers/User';
import GuestBlock from './GuestBlock';
import UserBlock from './UserBlock';

const TopUserBlock: FC = () => (
  <UserProvider>
    {({ user }) => {
      if (!user) {
        return <GuestBlock />;
      }

      return <UserBlock user={user} />;
    }}
  </UserProvider>
);

export default TopUserBlock;
