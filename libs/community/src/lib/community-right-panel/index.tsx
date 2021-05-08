import React, { useState } from 'react';
import { Chat } from '@dream/chat';
import { useRouter } from 'next/router';
import { useChannelQuery } from '@dream/types';
import { XIcon, UsersIcon, AnnotationIcon } from '@heroicons/react/solid';

const Users = ({ onClose }) => {
  return (
    <div className="absolute h-full w-full bg-surface">
      <div className="flex flex-shrink-0 w-full text-white h-10 px-4 items-center justify-between">
        <UsersIcon className="text-accent h-3.5" />
        <span className="text-accent text-sm">Users</span>
        <button
          onClick={onClose}
          className="h-8 w-8 rounded hover:bg-surface-light flex items-center justify-center"
        >
          <XIcon className="w-4 h-4 text-accent" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

export const CommunityRightPanel = () => {
  const [usersIsOpen, setUsersIsOpen] = useState(false);

  const { query } = useRouter();
  const name = typeof query?.channel === 'string' && query?.channel;

  const communityChannelsQuery = useChannelQuery({
    variables: { name },
    skip: !name,
  });

  const channel = communityChannelsQuery?.data?.channel;

  return (
    <div className="h-screen flex flex-col flex-shrink-0 w-80 bg-surface relative">
      <div className="flex items-center h-10">
        <div className="flex flex-1 justify-center items-center bg-surface h-full">
          <span className="text-white text-sm">
            <AnnotationIcon className="text-white h-3.5" />
          </span>
        </div>
        <div
          className="flex flex-1 justify-center items-center bg-surface h-full cursor-pointer"
          onClick={() => setUsersIsOpen(true)}
        >
          <UsersIcon className="text-accent h-3.5" />
        </div>
      </div>
      <Chat channelId={channel?.id} />
      {usersIsOpen && <Users onClose={() => setUsersIsOpen(false)} />}
    </div>
  );
};
