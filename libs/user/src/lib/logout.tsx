import React from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useLogoutMutation } from '@dream/types';

export const UserLogout = () => {
  const router = useRouter();

  const [logout] = useLogoutMutation({
    onCompleted: () => {
      router.push('/api/auth/logout');
    },
  });

  return (
    <div className="p-4">
      <h2 className="text-accent-light uppercase text-sm font-medium mb-2">
        Log Out
      </h2>
      <p className="mb-6 text-accent text-sm">
        Are yor sure you want to logout?
      </p>
      <div className="flex w-full justify-end">
        <button
          type="button"
          className={clsx('btn mr-2')}
          onClick={() => router.back()}
        >
          Cancel
        </button>
        <button
          type="button"
          className={clsx('btn btn-primary')}
          onClick={() => logout()}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};
