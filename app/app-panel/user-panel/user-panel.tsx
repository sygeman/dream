'use client';

import { UserCircleIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import React, { useMemo } from 'react';

import { SessionUser } from '@/types/session-user';

type Properties = { user?: SessionUser };

export const UserPanel = ({ user }: Properties) => {
  const searchParameters = useSearchParams();
  const pathname = usePathname();

  const userLink = useMemo(() => {
    const newParameters = new URLSearchParams([...searchParameters.entries()]);

    if (user) {
      newParameters.set('userSettings', 'language');
    } else {
      newParameters.set('authModal', '1');
    }

    return `${pathname}?${newParameters?.toString()}`;
  }, [user, searchParameters]);

  return (
    <Link href={userLink} passHref>
      {user ? (
        <div className="flex items-center justify-center w-12 h-12 cursor-pointer">
          <div className="rounded-full h-8 w-8 flex items-center justify-center">
            <img src={user.image} className="h-full w-full rounded-full" />
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center w-12 h-12 cursor-pointer">
          <UserCircleIcon className="text-muted-foreground h-5" />
        </div>
      )}
    </Link>
  );
};
