import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const ChannelItem: React.FC<{
  title: string;
  name?: string;
  state?: string;
  online?: number;
}> = ({ name, title, state, online }) => {
  const router = useRouter();
  const community = router.query?.community;
  const channel = router.query?.channel;

  return (
    <Link href={name ? `/${community}/${name}` : `/${community}`}>
      <div
        className={clsx(
          'flex items-center flex-1 w-full h-11',
          'px-4 py-1',
          'cursor-pointer',
          'hover:opacity-95',
          'hover:bg-gray-700',
          name === channel && 'bg-gray-700'
        )}
      >
        <div className="flex flex-col flex-1">
          <div className="flex flex-1">
            <span className="text-white text-sm">{title}</span>
          </div>
          <div className="flex flex-1">
            <span className="text-gray-500 text-xs">{state}</span>
          </div>
        </div>

        {typeof online === 'number' && (
          <div>
            <span className="text-white text-xs rounded bg-gray-900 px-2 py-1">
              {online}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
};
