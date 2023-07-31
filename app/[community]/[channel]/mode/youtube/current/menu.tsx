import { Fragment } from 'react';
import { EllipsisVerticalIcon, ForwardIcon } from '@heroicons/react/20/solid';
import { Menu, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { skipVideoAction } from './actions';
import { useParams } from 'next/navigation';

export const CurrentMenu = () => {
  const params = useParams();

  const skipTrack = () => {
    skipVideoAction({
      communityName: params.community as string,
      channelName: params.channel as string,
    });
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      {({ open }) => (
        <>
          <Menu.Button
            className={clsx(
              'h-6 w-6 flex btn btn-secondary p-0 items-center justify-center',
              open && 'bg-surface',
            )}
          >
            <EllipsisVerticalIcon className="h-4 text-accent" />
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
                'divide-y divide-gray-100 rounded shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none',
              )}
            >
              <Menu.Item
                as="button"
                onClick={skipTrack}
                className={clsx(
                  'flex justify-between items-center w-full h-8 px-2',
                  'rounded overflow-hidden text-accent font-medium',
                  'hover:bg-surface hover:text-white',
                )}
              >
                <span className="text-sm">Skip</span>
                <ForwardIcon className="h-4 text-accent" />
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};
