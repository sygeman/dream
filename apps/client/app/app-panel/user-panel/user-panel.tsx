'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { UserCircleIcon } from '@heroicons/react/20/solid';
import { SessionUser } from '../../../types/session-user';

type Props = { user?: SessionUser };

export const UserPanel = ({ user }: Props) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const userLink = useMemo(() => {
    const newParams = new URLSearchParams(Array.from(searchParams.entries()));

    if (user) {
      newParams.set('userSettings', 'language');
    } else {
      newParams.set('authModal', '1');
    }

    return `${pathname}?${newParams?.toString()}`;
  }, [user, searchParams]);

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
          <UserCircleIcon className="text-accent h-5" />
        </div>
      )}
    </Link>
  );
};
