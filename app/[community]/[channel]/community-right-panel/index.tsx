'use client';

import { Transition } from '@headlessui/react';
import {
  ChatBubbleBottomCenterTextIcon,
  UsersIcon,
} from '@heroicons/react/20/solid';
import { ChannelMessage } from '@prisma/client';
import React, { useState } from 'react';

import { Chat } from '../chat/chat';
import { Users } from './users';

type Properties = {
  channelId: string;
  messages: ChannelMessage[];
};

export const CommunityRightPanel = ({ channelId, messages }: Properties) => {
  const [usersIsOpen, setUsersIsOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col shrink-0 w-80 bg-zinc-900 relative">
      <div className="flex items-center h-10">
        <div className="flex flex-1 justify-center items-center bg-zinc-900 h-full">
          <span className="text-white text-sm">
            <ChatBubbleBottomCenterTextIcon className="text-white h-3.5" />
          </span>
        </div>
        <div
          className="flex flex-1 justify-center items-center bg-zinc-900 h-full cursor-pointer"
          onClick={() => setUsersIsOpen(true)}
        >
          <UsersIcon className="text-muted-foreground h-3.5" />
        </div>
      </div>
      <Chat channelId={channelId} messages={messages} />
      <Transition
        as="div"
        className="absolute h-full w-full bg-zinc-900"
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
