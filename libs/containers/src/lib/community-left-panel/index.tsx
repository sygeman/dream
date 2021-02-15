import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const ChannelItem = ({ name, title, current, online }) => {
  const router = useRouter();
  const community = router.query?.community;
  const channel = router.query?.channel;

  return (
    <Link href={`/${community}/${name}`}>
      <div
        className={`flex items-center flex-1 w-full px-4 py-1 cursor-pointer hover:opacity-95 hover:bg-surface-light ${
          name === channel && 'bg-surface-light'
        }`}
      >
        <div className="flex flex-col flex-1">
          <div className="flex flex-1">
            <span className="text-text text-sm">{title}</span>
          </div>
          <div className="flex flex-1">
            <span className="text-gray-500 text-xs">{current}</span>
          </div>
        </div>

        <div>
          <span className="text-text text-xs rounded bg-background px-2 py-1">
            {online}
          </span>
        </div>
      </div>
    </Link>
  );
};

export const CommunityLeftPanel = () => {
  const router = useRouter();
  const community = router.query?.community;

  return (
    <div className="h-screen flex flex-col flex-shrink-0 w-240px bg-surface">
      <Link href={`/${community}`}>
        <div className="flex items-center w-full h-48px px-4 bg-primary hover:opacity-95 cursor-pointer">
          <span className="text-text">{community}</span>
        </div>
      </Link>

      <div className="flex flex-1 w-full overflow-hidden">
        <div className="flex flex-col w-full max-h-max overflow-y-auto">
          {[...Array(50).keys()].map((k) => (
            <ChannelItem
              key={k}
              title={`Channel #${k}`}
              current="Artist - Track"
              online={k}
              name={`channel-${k}`}
            />
          ))}
        </div>
      </div>

      <div className="w-full h-48px bg-surface border-t border-background"></div>
    </div>
  );
};
