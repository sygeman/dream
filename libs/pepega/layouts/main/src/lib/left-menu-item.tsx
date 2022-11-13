import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';

export const LeftMenuItem = ({
  route,
  title,
  icon,
  equal,
}: {
  route: string;
  title: string;
  icon: React.ReactNode;
  equal?: boolean;
}) => {
  const router = useRouter();

  const active = equal
    ? router.route === route
    : router.route.search(`${route}`) >= 0;

  return (
    <Link
      href={route}
      shallow
      passHref
      className={clsx(
        'border-l-4 text-sm border-primary m-0 relative h-8 flex',
        'items-center overflow-hidden truncate',
        active && 'bg-surface'
      )}
    >
      <div className="flex items-center justify-center w-12">{icon}</div>
      <div className="flex flex-1">{title}</div>
    </Link>
  );
};
