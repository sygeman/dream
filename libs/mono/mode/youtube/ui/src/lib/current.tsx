import React, { Fragment, useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { DotsVerticalIcon, FastForwardIcon } from '@heroicons/react/solid';
import { ChannelModeWaitlistProgress } from './components/progress';
import { Menu, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { useWaitlistYoutubeQueueSkipVideoMutation } from './mode-waitlist.api';
import { useCommunityChannel } from '@dream/mono-use-community-channel';

const CurrentMenu = () => {
  const { channelId } = useCommunityChannel();
  const [skipMutation] = useWaitlistYoutubeQueueSkipVideoMutation();
  const skipTrack = () => skipMutation({ variables: { channelId } });

  return (
    <Menu as="div" className="relative inline-block text-left">
      {({ open }) => (
        <>
          <Menu.Button
            className={clsx(
              'h-6 w-6 flex btn btn-secondary p-0 items-center justify-center',
              open && 'bg-surface'
            )}
          >
            <DotsVerticalIcon className="h-4 text-accent" />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
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

export const ChannelYoutubeModeCurrent = ({
  current,
  muted = false,
  minimal = false,
}) => {
  const player = useRef<any>(null);
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    const s = +new Date(+current?.startedAt);
    const now = +new Date();
    const start = (now - s) / 1000;

    console.log(start);

    if (isReady && player.current) {
      player.current.seekTo(start, 'seconds');
    }
  }, [current?.startedAt, isReady]);

  return (
    <div className="relative">
      {current ? (
        <div>
          <div
            className={clsx(
              'aspect-w-16 aspect-h-9 z-10',
              minimal && 'absolute'
            )}
          >
            <ReactPlayer
              ref={player}
              url={`https://www.youtube.com/watch?v=${current.videoId}`}
              height="100%"
              width="100%"
              playing
              muted={muted}
              onReady={() => setIsReady(true)}
            />
          </div>
          <div className="h-12 flex items-center px-2">
            <ChannelModeWaitlistProgress
              start={current.startedAt}
              duration={current.duration}
              imageUrl={current.cover}
              name={current.title}
            />
            <div className="flex flex-col text-xs font-medium px-2 opacity-70 text-right ml-auto">
              <div className="text-accent">from</div>
              <div className="text-white">{current.author.name}</div>
            </div>
            <div className="flex rounded-full overflow-hidden h-8 w-8 bg-background mr-2">
              <img src={current.author.avatar} className="" alt="" />
            </div>
            <CurrentMenu />
          </div>
        </div>
      ) : (
        <div className="flex flex-col px-4">
          <div className="text-md text-white">Nothing is playing now</div>
          <div className="text-sm text-accent">
            The queue is empty, add some cool video
          </div>
        </div>
      )}
    </div>
  );
};
