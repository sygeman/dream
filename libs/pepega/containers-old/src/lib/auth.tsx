import { FC } from 'react';
import { AuthButtonTwitch } from '@dream/mono-auth-ui';

export const Auth: FC = () => (
  <div className="flex flex-col py-5 px-10 w-[500px]">
    <div className="flex flex-col px-4 py-2">
      <AuthButtonTwitch />
    </div>
  </div>
);
