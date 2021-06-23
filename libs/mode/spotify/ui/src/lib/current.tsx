import React, { Fragment } from 'react';
import {
  DotsVerticalIcon,
  FastForwardIcon,
  PlayIcon,
  StopIcon,
} from '@heroicons/react/solid';
import { ChannelModeWaitlistProgress } from './components/progress';
import { Menu, Transition } from '@headlessui/react';
import clsx from 'clsx';
import {
  SpotifyModeCurrentAction,
  useSpotifyModeQueueSkipTrackMutation,
} from '@dream/types';
import { useCommunityChannel } from '@dream/community';

const MenuItem = ({ action, label, icon }) => {
  return (
    <Menu.Item
      as="button"
      onClick={action}
      className={clsx(
        'flex justify-between items-center w-full h-8 px-2',
        'rounded overflow-hidden text-accent font-medium',
        'hover:bg-surface hover:text-white'
      )}
    >
      <span className="text-sm">{label}</span>
      {icon}
    </Menu.Item>
  );
};

const MenuItemSkip = () => {
  const { channelId } = useCommunityChannel();
  const [skipMutation] = useSpotifyModeQueueSkipTrackMutation();
  const skipTrack = () => skipMutation({ variables: { channelId } });

  return (
    <MenuItem
      action={skipTrack}
      label="Skip"
      icon={<FastForwardIcon className="h-4 text-accent" />}
    />
  );
};

const CurrentMenu: React.FC<{ actions: SpotifyModeCurrentAction[] }> = ({
  actions,
}) => {
  const getMenuItemByAction = (action: SpotifyModeCurrentAction) => {
    switch (action) {
      case SpotifyModeCurrentAction.Skip:
        return <MenuItemSkip />;
      default:
        return null;
    }
  };

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
              {actions.map(getMenuItemByAction)}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};

export const ChannelSpotifyModeCurrent = ({
  current,
  isConnected,
  setIsConnected,
}) => {
  const currentItem = current?.item;
  const currentActions = current?.actions;

  return (
    <div className="relative h-16">
      <div className="absolute top-0 left-0 h-full w-full opacity-20 bg-surface" />
      <div className="relative h-full">
        <div className="relative h-full flex items-center">
          {currentItem ? (
            <ChannelModeWaitlistProgress
              start={currentItem.start}
              startedAt={currentItem.startedAt}
              duration={currentItem.duration}
              imageUrl={currentItem.cover}
              artist={currentItem.artists}
              name={currentItem.title}
            />
          ) : (
            <div className=" flex flex-col px-4">
              <div className="text-md text-white">Nothing is playing now</div>
              <div className="text-sm text-accent">
                The queue is empty, add some cool track
              </div>
            </div>
          )}

          <div className="absolute right-4 top-0 h-full flex items-center">
            {isConnected ? (
              <button
                className="btn btn-secondary bg-surface flex flex-nowrap w-auto"
                onClick={() => setIsConnected(false)}
              >
                <StopIcon className="h-4 mr-2 opacity-70" />
                <span className="flex flex-nowrap">Leave Stream</span>
              </button>
            ) : (
              <button
                className={clsx(
                  'btn flex flex-nowrap w-auto',
                  currentItem ? 'btn-primary' : 'btn-secondary bg-surface'
                )}
                onClick={() => setIsConnected(true)}
              >
                <PlayIcon className="h-4 mr-2 opacity-70" />
                <span className="flex flex-nowrap">Connect to Stream</span>
              </button>
            )}
            {currentItem && (
              <>
                <div className="flex flex-col text-xs font-medium px-2 opacity-70 text-right ml-2">
                  <div className="text-accent">from</div>
                  <div className="text-white">{currentItem.author.name}</div>
                </div>
                <div className="flex rounded-full overflow-hidden h-8 w-8 bg-background mr-2">
                  <img src={currentItem.author.avatar} className="" alt="" />
                </div>
                {currentActions.length > 0 && (
                  <CurrentMenu actions={currentActions} />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
