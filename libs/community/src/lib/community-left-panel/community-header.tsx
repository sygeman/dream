import React, { useRef, useState } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useOnClickOutside } from '@dream/utils/useOnClickOutside';
import { useCommunityQuery } from '@dream/types';

export const CommunityHeader = () => {
  const headerRef = useRef();
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const toggleMenu = () => setMenuIsOpen(!menuIsOpen);
  useOnClickOutside(headerRef, () => setMenuIsOpen(false));

  const isUser = true;

  const router = useRouter();
  const name =
    typeof router.query?.community === 'string' && router.query?.community;

  const communityQuery = useCommunityQuery({
    variables: { name },
    skip: !name,
  });

  const community = communityQuery?.data?.community;

  return (
    <div className="relative" ref={headerRef}>
      <div
        className={clsx(
          'flex justify-between items-center w-full h-12 px-4',
          'bg-surface cursor-pointer border-b border-backgorud'
        )}
        onClick={toggleMenu}
      >
        <span className="text-white">{community?.title}</span>
        <FontAwesomeIcon
          icon={menuIsOpen ? faTimes : faAngleDown}
          className="text-accent mr-2 h-4"
        />
      </div>

      {menuIsOpen && (
        <div className="absolute top-full left-0 w-full z-10">
          <div className="bg-backgorud m-1 p-2 rounded overflow-hidden">
            <Link
              as={isUser ? `/${name}/new` : `/auth?continue=/${name}`}
              href={{
                pathname: router.route,
                query: {
                  ...router.query,
                  [isUser ? 'newChannel' : 'authModal']: 1,
                },
              }}
              passHref
            >
              <button
                className="text-white text-sm px-2 py-1 rounded hover:bg-surface-light cursor-pointer w-full text-left"
                onClick={() => setMenuIsOpen(false)}
              >
                Create channel
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
