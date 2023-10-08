import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import useAxios from 'axios-hooks';
import React, { useEffect, useRef, useState } from 'react';
import { useDebounce } from 'use-debounce';

import { ScrollArea } from '@/components/ui/scroll-area';
import { key as tenorKey } from '@/config/tenor';

export interface GifPickerProperties {
  onSelect?: (url: string) => void;
  gifContainer?: (gif: React.ReactNode) => React.ReactNode;
}

export const GifPicker: React.FC<GifPickerProperties> = ({
  onSelect,
  gifContainer = (gif: React.ReactNode) => <div>{gif}</div>,
}) => {
  const [nextPos, setNextPos] = useState();
  const [dataPerPage, setDataPerPage] = useState({});

  const [searchQuery, setSearchQuery] = useState('');
  const [searchQueryWithDebounce] = useDebounce(searchQuery, 300);
  const inputReference = useRef<HTMLInputElement>(null);

  const [{ data, loading, error }, refetch] = useAxios({
    url: 'https://g.tenor.com/v1/search',
    params: {
      key: tenorKey,
      q: searchQueryWithDebounce,
      pos: nextPos,
    },
  });

  // @ts-ignore
  const gifs = Object.values(dataPerPage).flat() || [];

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
      // @ts-ignore
      inputReference.current.focus();
    }, 300);
  }, []);

  return (
    <div className="flex flex-col w-full overflow-hidden">
      <div className="p-2 w-full relative">
        <input
          ref={inputReference}
          className="bg-zinc-900 text-white text-xs resize-none p-2 pr-10 rounded w-full focus:outline-none"
          placeholder="Search Tensor"
          onChange={(event) => setSearchQuery(event.currentTarget.value.trim())}
        />
        <div className="absolute top-2 right-2 h-8 w-8 flex justify-center items-center">
          <MagnifyingGlassIcon className="h-4 text-muted-foreground" />
        </div>
      </div>
      <ScrollArea className="w-full h-64 px-2 pb-2">
        <div
          className="box-border mx-auto gap-x-2 before:box-inherit after:box-inherit"
          style={{ columnCount: 2 }}
        >
          {gifs.map((gif) => (
            <div
              // @ts-ignore
              key={gif.id}
              className="w-full cursor-pointer rounded overflow-hidden mb-2 bg-background"
              style={{ breakInside: 'avoid' }}
              // @ts-ignore
              onClick={() => onSelect(gif.itemurl)}
            >
              {gifContainer(
                // @ts-ignore
                <video src={gif.media?.[0].webm.url} loop autoPlay />
              )}
            </div>
          ))}
        </div>
        <div onClick={loadMore}>Load More</div>
      </ScrollArea>
    </div>
  );
};
