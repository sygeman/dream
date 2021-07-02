import React, { useState, Fragment } from 'react';
import clsx from 'clsx';
import useAxios from 'axios-hooks';
import SimpleBar from 'simplebar-react';
import { useDebounce } from 'use-debounce';
import { Menu, Transition } from '@headlessui/react';
import { PhotographIcon } from '@heroicons/react/solid';

export interface GifMenuProps {
  onSelect?: (url: string) => void;
}

export const GifMenu: React.FC<GifMenuProps> = ({ onSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchQueryWithDebounce] = useDebounce(searchQuery, 300);

  const key = 'J9KE7ZY93YW1';
  const trending = `https://g.tenor.com/v1/search?key=${key}&q=${searchQueryWithDebounce}`;

  const [{ data, loading, error }, refetch] = useAxios(trending);
  const gifs = data?.results || [];

  return (
    <Menu>
      <>
        <Menu.Button className="absolute right-2 bottom-2">
          {({ open }) => (
            <PhotographIcon
              className={clsx('h-4', open ? 'text-white' : 'text-accent')}
            />
          )}
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
          <Menu.Items className="absolute right-0 bottom-10 bg-background rounded w-full shadow-md">
            <div className="flex flex-col w-full overflow-hidden">
              <div className="p-2 w-full">
                <input
                  className="bg-surface text-white text-xs resize-none p-2 rounded w-full focus:outline-none"
                  placeholder="Search Tensor"
                  onChange={(e) => {
                    setSearchQuery(e.currentTarget.value.trim());
                  }}
                />
              </div>
              <SimpleBar className="w-full h-64 px-2 pb-2">
                <div
                  className="box-border mx-auto gap-x-2 before:box-inherit after:box-inherit"
                  style={{ columnCount: 2 }}
                >
                  {gifs.map((gif) => (
                    <Menu.Item
                      key={gif.id}
                      as="div"
                      className="w-full cursor-pointer rounded overflow-hidden mb-2"
                      style={{ breakInside: 'avoid' }}
                      onClick={() => onSelect(gif.itemurl)}
                    >
                      <video src={gif.media?.[0].webm.url} loop autoPlay />
                    </Menu.Item>
                  ))}
                </div>
              </SimpleBar>
            </div>
          </Menu.Items>
        </Transition>
      </>
    </Menu>
  );
};
