import React, { useRef, useState } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { usePopper } from 'react-popper';
import { useClickAway } from 'react-use';

export const ChannelItem: React.FC<{
  title: string;
  name?: string;
  state?: string;
  online?: number;
}> = ({ name, title, state, online }) => {
  const router = useRouter();
  const community = router.query?.community;
  const channel = router.query?.channel;
  const selected = name === channel;

  const menuRef = useRef();
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-end',
  });

  useClickAway(menuRef, () => {
    setMenuIsOpen(false);
  });

  const toggleMenu = () => setMenuIsOpen(!menuIsOpen);

  return (
    <div className="group mx-2 my-1">
      <Link href={name ? `/${community}/${name}` : `/${community}`}>
        <div
          className={clsx(
            'flex items-center flex-1 w-full h-11',
            'px-4 py-1',
            'cursor-pointer',
            'hover:bg-surface-light',
            'rounded',
            selected && 'bg-surface-light'
          )}
        >
          <div className="flex flex-col flex-1">
            <div className="flex flex-1">
              <span className="text-white text-sm font-medium">{title}</span>
            </div>
            <div className="flex flex-1">
              <span className="text-accent text-xs">{state}</span>
            </div>
          </div>

          {name && (
            <div
              ref={setReferenceElement}
              onClick={(e) => {
                e.stopPropagation();
                toggleMenu();
              }}
              className={clsx(
                'p-2 -mr-2 rounded hover:bg-surface',
                menuIsOpen
                  ? 'text-white bg-surface'
                  : 'text-accent hover:text-white ',
                !selected && !menuIsOpen && 'opacity-0 group-hover:opacity-100'
              )}
            >
              <FontAwesomeIcon icon={faEllipsisV} className={clsx('h-3')} />
            </div>
          )}

          {menuIsOpen && (
            <div
              className="w-full px-4"
              ref={setPopperElement}
              style={styles.popper}
              {...attributes.popper}
            >
              <div
                className="bg-backgorud rounded shadow-2xl p-2"
                ref={menuRef}
              >
                <Link href={`/${community}/${name}/settings`}>
                  <a
                    href="replace"
                    className="flex w-full text-white px-2 py-1 text-sm hover:bg-surface-light cursor-pointer rounded"
                  >
                    Settings
                  </a>
                </Link>
                <div className="text-white px-2 py-1 text-sm hover:bg-surface-light cursor-pointer rounded">
                  Delete
                </div>
              </div>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};
