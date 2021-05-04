import React, { Fragment } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { useIntl } from 'react-intl';
import { useRouter } from 'next/router';
import { Menu, Transition } from '@headlessui/react';
import { useCommunityQuery } from '@dream/types';
import { ChevronDownIcon, PlusCircleIcon, XIcon } from '@heroicons/react/solid';

export const CommunityHeader = () => {
  const intl = useIntl();
  const router = useRouter();
  const name =
    typeof router.query?.community === 'string' && router.query?.community;

  const isUser = true;

  const communityQuery = useCommunityQuery({
    variables: { name },
    skip: !name,
  });

  const community = communityQuery?.data?.community;

  return (
    <Menu as="div" className="relative z-10">
      {({ open }) => (
        <>
          <Menu.Button
            className={clsx(
              'flex justify-between items-center w-full h-10 px-4 text-md',
              'bg-surface cursor-pointer text-white focus:outline-none'
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
              <div className="bg-backgorud rounded shadow-lg p-2">
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
                    <a
                      href="replace"
                      className="text-white text-sm px-2 py-1 rounded hover:bg-surface-light cursor-pointer w-full flex justify-between items-center"
                    >
                      {intl.formatMessage({
                        id: 'newChannelCreateButton',
                      })}
                      <PlusCircleIcon
                        className="w-4 h-4 text-accent"
                        aria-hidden="true"
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
