import React, { Fragment, useState } from 'react';
import {
  DotsVerticalIcon,
  FastForwardIcon,
  PlayIcon,
  StopIcon,
} from '@heroicons/react/solid';
import { ChannelModeWaitlistProgress } from './components/progress';
import { Menu, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { useWaitlistSpotifyQueueSkipTrackMutation } from '@dream/types';
import { useChannelId } from './use-channel-id';

const CurrentMenu = () => {
  const channelId = useChannelId();
  const [skipMutation] = useWaitlistSpotifyQueueSkipTrackMutation();
  const skipTrack = () => skipMutation({ variables: { channelId } });

  return (
    <Menu as="div" className="relative inline-block text-left">
      {({ open }) => (
        <>
          <Menu.Button
            className={clsx(
              'h-6 w-6 flex btn p-0 items-center justify-center',
              open && 'bg-background'
            )}
          >
            <DotsVerticalIcon className="h-4 text-accent" />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              className={clsx(
                'absolute right-0 w-48 mt-2 origin-top-right bg-background p-2',
                'divide-y divide-gray-100 rounded shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
              )}
            >
              <Menu.Item
                as="button"
                onClick={skipTrack}
                className={clsx(
                  'flex justify-between items-center w-full h-8 px-2',
                  'rounded overflow-hidden text-accent font-medium',
                  'hover:bg-surface hover:text-white'
                )}
              >
                <span className="text-sm">Skip</span>
                <FastForwardIcon className="h-4 text-accent" />
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};

export const ChannelModeWaitlistSpotifyCurrent = ({
  current,
  isConnected,
  setIsConnected,
}) => {
  return (
    <div className="relative">
      <div className="absolute top-0 left-0 h-full w-full opacity-20 bg-background" />
      <div className="relative">
        <div className="relative">
          {current && (
            <ChannelModeWaitlistProgress
              start={current.startedAt}
              duration={current.duration}
              imageUrl={current.cover}
              artist={current.artists}
              name={current.title}
            />
          )}
          {current && (
            <div className="absolute right-4 top-0 h-full flex items-center">
              {isConnected ? (
                <button
                  className="btn btn-secondary bg-surface mr-2 flex flex-nowrap w-auto"
                  onClick={() => setIsConnected(false)}
                >
                  <StopIcon className="h-4 mr-2 opacity-70" />
                  <span className="flex flex-nowrap">Leave Stream</span>
                </button>
              ) : (
                <button
                  className="btn btn-primary mr-2 flex flex-nowrap w-auto"
                  onClick={() => setIsConnected(true)}
                >
                  <PlayIcon className="h-4 mr-2 opacity-70" />
                  <span className="flex flex-nowrap">Connect to Stream</span>
                </button>
              )}
              <div className="flex flex-col text-xs font-medium px-2 opacity-70 text-right">
                <div className="text-accent">from</div>
                <div className="text-white">{current.author.name}</div>
              </div>
              <div className="flex rounded-full overflow-hidden h-8 w-8 rounded-full bg-background mr-2">
                <img src={current.author.avatar} className="" alt="" />
              </div>
              <CurrentMenu />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
