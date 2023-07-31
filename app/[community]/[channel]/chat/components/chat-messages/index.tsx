import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import { Virtuoso, VirtuosoHandle } from 'react-virtuoso';
import { Scroller } from './scrollbar';
import { ChatMessage } from './message';

export const ChatMessages = ({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  messages,
  // loadNextPage,
  // loadPrevPage,
  // initialTopMostItemIndex,
  // firstItemIndex,
}) => {
  const virtuoso = useRef<VirtuosoHandle>(null);
  const [atBottom, setAtBottom] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const showButtonTimeoutRef = useRef(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    clearTimeout(showButtonTimeoutRef.current);
    if (!atBottom) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      showButtonTimeoutRef.current = setTimeout(() => setShowButton(true), 500);
    } else {
      setShowButton(false);
    }
  }, [atBottom, setShowButton]);

  useEffect(() => {
    return () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      clearTimeout(showButtonTimeoutRef.current);
    };
  }, []);

  const toBottom = () =>
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    virtuoso.current.scrollToIndex({
      index: messages.length - 1,
    });

  return (
    <div className="flex flex-col flex-1 overflow-hidden relative h-full">
      <Virtuoso
        data={messages}
        ref={virtuoso}
        className="h-full"
        // overscan={200}
        initialTopMostItemIndex={100000}
        // startReached={loadPrevPage}
        // endReached={loadNextPage}
        // firstItemIndex={firstItemIndex}
        atBottomStateChange={setAtBottom}
        itemContent={(_index, item) => <ChatMessage {...item} />}
        followOutput
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        components={{ Scroller }}
      />
      {showButton && (
        <button
          className={clsx(
            'absolute bottom-0',
            'flex w-full items-center justify-center',
            'text-white text-sm',
            'bg-zinc-900',
            'opacity-90 cursor-pointer'
          )}
          onClick={toBottom}
        >
          Chat Paused Due to Scroll
        </button>
      )}
    </div>
  );
};
