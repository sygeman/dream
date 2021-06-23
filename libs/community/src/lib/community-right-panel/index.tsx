import React, { useState } from 'react';
import { Chat } from '@dream/chat';
import { XIcon, UsersIcon, AnnotationIcon } from '@heroicons/react/solid';
import { Transition } from '@headlessui/react';
import { useCommunityChannel } from '../use-community-channel';

const Users = ({ onClose }) => {
  return (
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
  );
};

export const CommunityRightPanel = () => {
  const [usersIsOpen, setUsersIsOpen] = useState(false);
  const { channel } = useCommunityChannel();

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
      <Transition
        as="div"
        className="absolute h-full w-full bg-surface"
        show={usersIsOpen}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Users onClose={() => setUsersIsOpen(false)} />
      </Transition>
    </div>
  );
};
