'use client';

import { Menu, Transition } from '@headlessui/react';
import {
  ChevronDownIcon,
  CogIcon,
  PlusCircleIcon,
  XMarkIcon,
} from '@heroicons/react/20/solid';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Fragment, useMemo } from 'react';

import { MenuItem } from './item';

type Properties = {
  title?: string;
};

export const CommunityHeader = ({ title }: Properties) => {
  const searchParameters = useSearchParams();
  const pathname = usePathname();

  const newChannelLink = useMemo(() => {
    const newParameters = new URLSearchParams([...searchParameters.entries()]);
    newParameters.set('newChannel', '1');
    return `${pathname}?${newParameters?.toString()}`;
  }, [searchParameters]);

  const communitySettingsLink = useMemo(() => {
    const newParameters = new URLSearchParams([...searchParameters.entries()]);
    newParameters.set('communitySettings', 'overview');
    return `${pathname}?${newParameters?.toString()}`;
  }, [searchParameters]);

  return (
    <Menu as="div" className="relative z-10">
      {({ open }) => (
        <>
          <Menu.Button
            id="1"
            className={clsx(
              'flex justify-between items-center w-full h-10 px-4 text-md transition-colors',
              'bg-zinc-900 cursor-pointer text-white focus:outline-none hover:bg-zinc-900-light',
              open && 'bg-zinc-900-light'
            )}
          >
            {title}
            <span className="w-4 h-4 flex items-center justify-center text-muted-foreground">
              {open ? (
                <XMarkIcon aria-hidden="true" />
              ) : (
                <ChevronDownIcon aria-hidden="true" />
              )}
            </span>
          </Menu.Button>
          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Menu.Items
              static
              className="absolute left-0 w-full focus:outline-none p-1"
            >
              <div className="bg-background rounded shadow-lg p-2">
                <Menu.Item>
                  <Link href={newChannelLink} passHref>
                    <MenuItem Icon={PlusCircleIcon} label="Create channel" />
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <Link href={communitySettingsLink} passHref>
                    <MenuItem Icon={CogIcon} label="Community settings" />
                  </Link>
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};
