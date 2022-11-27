import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { CogIcon } from '@heroicons/react/20/solid';
import { useCommunityChannel } from '@dream/mono-use-community-channel';

export const ChannelHeader = () => {
  const router = useRouter();

  const isUser = true;

  const { channel } = useCommunityChannel();

  return (
    <div className="flex shrink-0 w-full bg-background-light text-white h-10 px-4">
      <div className="h-full flex flex-1 items-center text-sm">
        {channel?.title}
      </div>
      {isUser && (
        <div className="h-full flex items-center ml-4">
          <Link
            className="h-8 w-8 rounded hover:bg-surface-light flex items-center justify-center"
            href={{
              pathname: router.route,
              query: {
                ...router.query,
                channelSettings: 'overview',
              },
            }}
            passHref
          >
            <CogIcon className="w-4 h-4 text-accent" aria-hidden="true" />
          </Link>
        </div>
      )}
    </div>
  );
};
