'use client';

import React, { useState } from 'react';
import { Chat } from './chat/chat';
import {
  UsersIcon,
  ChatBubbleBottomCenterTextIcon,
} from '@heroicons/react/20/solid';
import { Transition } from '@headlessui/react';
import { Users } from './users';

type Props = {
  channelId: string;
};

export const CommunityRightPanel = ({ channelId }: Props) => {
  const [usersIsOpen, setUsersIsOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col shrink-0 w-80 bg-surface relative">
      <div className="flex items-center h-10">
        <div className="flex flex-1 justify-center items-center bg-surface h-full">
          <span className="text-white text-sm">
            <ChatBubbleBottomCenterTextIcon className="text-white h-3.5" />
          </span>
        </div>
        <div
          className="flex flex-1 justify-center items-center bg-surface h-full cursor-pointer"
          onClick={() => setUsersIsOpen(true)}
        >
          <UsersIcon className="text-accent h-3.5" />
        </div>
      </div>
      <Chat channelId={channelId} />
      <Transition
        as="div"
        className="absolute h-full w-full bg-surface"
        show={usersIsOpen}
        enter="transition ease-out duration-100"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Users onClose={() => setUsersIsOpen(false)} />
      </Transition>
    </div>
  );
};
