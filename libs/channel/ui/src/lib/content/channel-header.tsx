import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CogIcon } from '@heroicons/react/solid';
import { channelMods } from '../channel-mode';
import { useCommunityChannel } from '../use-community-channel';

export const ChannelHeader = () => {
  const router = useRouter();

  const isUser = true;

  const { channel } = useCommunityChannel();
  const mode = channelMods.find((m) => m?.value === channel?.mode);

  return (
    <div className="flex shrink-0 w-full bg-background-light text-white h-10 px-4">
      {mode?.icon && (
        <div className="h-full flex items-center text-sm mr-4">
          <FontAwesomeIcon icon={mode?.icon} className={`${mode?.color} h-4`} />
        </div>
      )}
      <div className="h-full flex flex-1 items-center text-sm">
        {channel?.title}
      </div>
      {isUser && (
        <div className="h-full flex items-center ml-4">
          <Link
            href={{
              pathname: router.route,
              query: {
                ...router.query,
                channelSettings: 'overview',
              },
            }}
            passHref
          >
            <a
              href="replace"
              className="h-8 w-8 rounded hover:bg-surface-light flex items-center justify-center"
            >
              <CogIcon className="w-4 h-4 text-accent" aria-hidden="true" />
            </a>
          </Link>
        </div>
      )}
    </div>
  );
};
