import React, { Fragment } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { useIntl } from 'react-intl';
import { useRouter } from 'next/router';
import { Menu, Transition } from '@headlessui/react';
import {
  ChevronDownIcon,
  PlusCircleIcon,
  XIcon,
  CogIcon,
} from '@heroicons/react/solid';
import { useCommunityChannel } from '../use-community-channel';

const MenuItem = ({ Icon, label }) => {
  return (
    <div
      className={clsx(
        'w-full flex justify-between items-center',
        'text-white text-sm font-medium',
        'px-2 h-8 rounded hover:bg-surface-light cursor-pointer '
      )}
    >
      {label}
      <Icon className="w-4 h-4 text-accent" aria-hidden="true" />
    </div>
  );
};

export const CommunityHeader = () => {
  const intl = useIntl();
  const router = useRouter();

  const isUser = true;

  const { community } = useCommunityChannel();

  return (
    <Menu as="div" className="relative z-10">
      {({ open }) => (
        <>
          <Menu.Button
            className={clsx(
              'flex justify-between items-center w-full h-10 px-4 text-md transition-colors',
              'bg-surface cursor-pointer text-white focus:outline-none hover:bg-surface-light',
              open && 'bg-surface-light'
            )}
          >
            {community?.title}
            <span className="w-4 h-4 flex items-center justify-center text-accent">
              {open ? (
                <XIcon aria-hidden="true" />
              ) : (
                <ChevronDownIcon aria-hidden="true" />
              )}
            </span>
          </Menu.Button>
          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              static
              className="absolute left-0 w-full focus:outline-none p-1"
            >
              <div className="bg-background rounded shadow-lg p-2">
                <Menu.Item>
                  <Link
                    href={{
                      pathname: router.route,
                      query: {
                        ...router.query,
                        [isUser ? 'newChannel' : 'authModal']: 1,
                      },
                    }}
                    passHref
                  >
                    <a href="replace">
                      <MenuItem
                        Icon={PlusCircleIcon}
                        label={intl.formatMessage({
                          id: 'newChannelCreateButton',
                        })}
                      />
                    </a>
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <Link
                    href={{
                      pathname: router.route,
                      query: {
                        ...router.query,
                        communitySettings: 'overview',
                      },
                    }}
                    passHref
                  >
                    <a href="replace">
                      <MenuItem
                        Icon={CogIcon}
                        label={intl.formatMessage({
                          id: 'communitySettingsButton',
                        })}
                      />
                    </a>
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
