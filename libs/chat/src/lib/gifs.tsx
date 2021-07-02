import React, { useState } from 'react';
import useAxios from 'axios-hooks';
import SimpleBar from 'simplebar-react';
import { Menu } from '@headlessui/react';

export const GifMenu = ({ onSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const key = 'J9KE7ZY93YW1';
  const trending = `https://g.tenor.com/v1/search?key=${key}&q=${searchQuery}`;

  const [{ data, loading, error }, refetch] = useAxios(trending);
  const gifs = data?.results || [];

  return (
    <div className="flex flex-col w-full overflow-hidden">
      <div className=" p-2 w-full">
        <input
          className="bg-surface text-white text-xs resize-none p-2 rounded w-full focus:outline-none focus:ring-1"
          placeholder="Search Tensor"
          onChange={(e) => {
            setSearchQuery(e.currentTarget.value.trim());
          }}
        />
      </div>
      <SimpleBar className="w-full h-64 p-3">
        {gifs.map((gif) => (
          <Menu.Item
            as="div"
            key={gif.id}
            className="w-full pb-2 cursor-pointer"
            onClick={() => onSelect(gif.itemurl)}
          >
            <video src={gif.media?.[0].webm.url} loop autoPlay />
          </Menu.Item>
        ))}
      </SimpleBar>
    </div>
  );
};
