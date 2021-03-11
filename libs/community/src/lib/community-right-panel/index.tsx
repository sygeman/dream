import React from 'react';
import { AnnotationIcon } from '@dream/icons/annotation';
import { UsersIcon } from '@dream/icons/users';
import { Chat } from '@dream/chat';
import { useRouter } from 'next/router';
import { useChannelQuery } from '@dream/types';

export const CommunityRightPanel = () => {
  const { query } = useRouter();
  const name = typeof query?.channel === 'string' && query?.channel;

  const communityChannelsQuery = useChannelQuery({
    variables: { name },
    skip: !name,
  });

  const channel = communityChannelsQuery?.data?.channel;

  return (
    <div className="h-screen flex flex-col w-320px bg-surface">
      <div className="flex border-b border-background">
        <div className="flex flex-1 justify-center px-4 py-2 bg-surface">
          <span className="text-text text-sm">
            <AnnotationIcon />
          </span>
        </div>
        <div className="flex flex-1 justify-center px-4 py-2 bg-surface">
          <span className="text-text text-sm">
            <UsersIcon />
          </span>
        </div>
      </div>
      <Chat channelId={channel?.id} />
    </div>
  );
};
