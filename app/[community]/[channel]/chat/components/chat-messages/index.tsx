import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import { Virtuoso, VirtuosoHandle } from 'react-virtuoso';

import { ChatMessage } from './message';
import { Scroller } from './scrollbar';

export const ChatMessages = ({
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
  const showButtonTimeoutReference = useRef(null);

  useEffect(() => {
    // @ts-ignore
    clearTimeout(showButtonTimeoutReference.current);
    if (atBottom) {
      setShowButton(false);
    } else {
      // @ts-ignore
      showButtonTimeoutReference.current = setTimeout(
        () => setShowButton(true),
        500
      );
    }
  }, [atBottom, setShowButton]);

  useEffect(() => {
    return () => {
      // @ts-ignore
      clearTimeout(showButtonTimeoutReference.current);
    };
  }, []);

  const toBottom = () =>
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
        initialTopMostItemIndex={100_000}
        // startReached={loadPrevPage}
        // endReached={loadNextPage}
        // firstItemIndex={firstItemIndex}
        atBottomStateChange={setAtBottom}
        itemContent={(_index, item) => <ChatMessage {...item} />}
        followOutput
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
