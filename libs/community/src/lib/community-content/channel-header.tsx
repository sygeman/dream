import React from 'react';
import { useRouter } from 'next/router';
import { useChannelQuery } from '@dream/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { channelMods } from '../channel-mods';

export const ChannelHeader = () => {
  const router = useRouter();
  const name =
    typeof router.query?.channel === 'string' && router.query?.channel;

  const communityQuery = useChannelQuery({
    variables: { name },
    skip: !name,
  });

  const channel = communityQuery?.data?.channel;
  const mode = channelMods.find((m) => m?.value === channel?.mode);

  return (
    <div className="flex w-full bg-surface text-white h-10 border-b border-l border-r border-backgorud px-4">
      <div className="h-full flex items-center text-sm">
        <FontAwesomeIcon icon={mode?.icon} className={`${mode?.color} h-4`} />
      </div>
      <div className="h-full flex items-center ml-4 text-sm">
        {channel?.title}
      </div>
    </div>
  );
};
