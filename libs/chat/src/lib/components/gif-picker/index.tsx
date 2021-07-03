import React, { useEffect, useRef, useState } from 'react';
import useAxios from 'axios-hooks';
import SimpleBar from 'simplebar-react';
import { useDebounce } from 'use-debounce';
import { SearchIcon } from '@heroicons/react/solid';

export interface GifPickerProps {
  onSelect?: (url: string) => void;
  gifContainer?: (gif: React.ReactNode) => React.ReactNode;
}

export const GifPicker: React.FC<GifPickerProps> = ({
  onSelect,
  gifContainer = (gif: React.ReactNode) => <div>{gif}</div>,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchQueryWithDebounce] = useDebounce(searchQuery, 300);
  const inputRef = useRef<HTMLInputElement>(null);

  const key = 'J9KE7ZY93YW1';
  const trending = `https://g.tenor.com/v1/search?key=${key}&q=${searchQueryWithDebounce}`;

  const [{ data, loading, error }, refetch] = useAxios(trending);
  const gifs = data?.results || [];

  useEffect(() => {
    setTimeout(() => {
      inputRef.current.focus();
    }, 300);
  }, []);

  return (
    <div className="flex flex-col w-full overflow-hidden">
      <div className="p-2 w-full relative">
        <input
          ref={inputRef}
          className="bg-surface text-white text-xs resize-none p-2 pr-10 rounded w-full focus:outline-none"
          placeholder="Search Tensor"
          onChange={(e) => setSearchQuery(e.currentTarget.value.trim())}
        />
        <div className="absolute top-2 right-2 h-8 w-8 flex justify-center items-center">
          <SearchIcon className="h-4 text-accent" />
        </div>
      </div>
      <SimpleBar className="w-full h-64 px-2 pb-2">
        <div
          className="box-border mx-auto gap-x-2 before:box-inherit after:box-inherit"
          style={{ columnCount: 2 }}
        >
          {gifs.map((gif) => (
            <div
              key={gif.id}
              className="w-full cursor-pointer rounded overflow-hidden mb-2"
              style={{ breakInside: 'avoid' }}
              onClick={() => onSelect(gif.itemurl)}
            >
              {gifContainer(
                <video src={gif.media?.[0].webm.url} loop autoPlay />
              )}
            </div>
          ))}
        </div>
      </SimpleBar>
    </div>
  );
};
