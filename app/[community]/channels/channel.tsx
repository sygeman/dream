'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { useParams } from 'next/navigation';

type Properties = {
  title: string;
  name?: string;
  state?: string;
  online?: number;
};

export const ChannelItem = ({ name, title, state, online }: Properties) => {
  const { community, channel } = useParams();
  const selected = name === channel;

  return (
    <Link
      href={name ? `/${community}/${name}` : `/${community}`}
      passHref
      className="group flex mx-2 my-1"
    >
      <div
        className={clsx(
          'flex items-center flex-1 w-full h-10',
          'px-2 py-1',
          'cursor-pointer transition-colors',
          'hover:bg-accent',
          'rounded',
          selected && 'bg-accent'
        )}
      >
        <div className="flex flex-col flex-1">
          <div className="flex flex-1">
            <span
              className={clsx(
                'text-white font-medium',
                state ? 'text-xs' : 'text-sm'
              )}
            >
              {title}
            </span>
          </div>
          {state && (
            <div className="flex flex-1" title={state}>
              <span className="text-muted-foreground text-xs line-clamp-1 mr-1">
                {state}
              </span>
            </div>
          )}
        </div>

        {typeof online === 'number' && online > 0 && (
          <div>
            <span className="text-muted-foreground text-xs rounded bg-background px-2 py-1">
              {online}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
};
