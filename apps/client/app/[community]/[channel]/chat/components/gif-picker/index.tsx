import React, { useEffect, useRef, useState } from 'react';
import useAxios from 'axios-hooks';
import { useDebounce } from 'use-debounce';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import { key as tenorKey } from 'apps/client/config/tenor';

export interface GifPickerProps {
  onSelect?: (url: string) => void;
  gifContainer?: (gif: React.ReactNode) => React.ReactNode;
}

export const GifPicker: React.FC<GifPickerProps> = ({
  onSelect,
  gifContainer = (gif: React.ReactNode) => <div>{gif}</div>,
}) => {
  const [nextPos, setNextPos] = useState();
  const [dataPerPage, setDataPerPage] = useState({});

  const [searchQuery, setSearchQuery] = useState('');
  const [searchQueryWithDebounce] = useDebounce(searchQuery, 300);
  const inputRef = useRef<HTMLInputElement>(null);

  const [{ data, loading, error }, refetch] = useAxios({
    url: 'https://g.tenor.com/v1/search',
    params: {
      key: tenorKey,
      q: searchQueryWithDebounce,
      pos: nextPos,
    },
  });
  const gifs = [].concat(...Object.values(dataPerPage)) || [];

  const loadMore = () => {
    console.log('loadMore', data?.next);
    setNextPos(data?.next);
  };

  useEffect(() => {
    if (data?.next) {
      setDataPerPage((d) => ({ ...d, [data?.next]: data?.results }));
    }
  }, [data?.next, data?.results]);

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
          <MagnifyingGlassIcon className="h-4 text-accent" />
        </div>
      </div>
      <OverlayScrollbarsComponent className="w-full h-64 px-2 pb-2">
        <div
          className="box-border mx-auto gap-x-2 before:box-inherit after:box-inherit"
          style={{ columnCount: 2 }}
        >
          {gifs.map((gif) => (
            <div
              key={gif.id}
              className="w-full cursor-pointer rounded overflow-hidden mb-2 bg-background"
              style={{ breakInside: 'avoid' }}
              onClick={() => onSelect(gif.itemurl)}
            >
              {gifContainer(
                <video src={gif.media?.[0].webm.url} loop autoPlay />,
              )}
            </div>
          ))}
        </div>
        <div onClick={loadMore}>Load More</div>
      </OverlayScrollbarsComponent>
    </div>
  );
};
