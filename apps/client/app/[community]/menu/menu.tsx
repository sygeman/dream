'use client';

import { Fragment, useMemo } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Menu, Transition } from '@headlessui/react';
import {
  ChevronDownIcon,
  PlusCircleIcon,
  XMarkIcon,
  CogIcon,
} from '@heroicons/react/20/solid';
import { MenuItem } from './item';

type Props = {
  title?: string;
};

export const CommunityHeader = ({ title }: Props) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const newChannelLink = useMemo(() => {
    const newParams = new URLSearchParams(Array.from(searchParams.entries()));
    newParams.set('newChannel', '1');
    return `${pathname}?${newParams?.toString()}`;
  }, [searchParams]);

  const communitySettingsLink = useMemo(() => {
    const newParams = new URLSearchParams(Array.from(searchParams.entries()));
    newParams.set('communitySettings', 'overview');
    return `${pathname}?${newParams?.toString()}`;
  }, [searchParams]);

  return (
    <Menu as="div" className="relative z-10">
      {({ open }) => (
        <>
          <Menu.Button
            id="1"
            className={clsx(
              'flex justify-between items-center w-full h-10 px-4 text-md transition-colors',
              'bg-surface cursor-pointer text-white focus:outline-none hover:bg-surface-light',
              open && 'bg-surface-light',
            )}
          >
            {title}
            <span className="w-4 h-4 flex items-center justify-center text-accent">
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
