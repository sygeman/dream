import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import { Virtuoso, VirtuosoHandle } from 'react-virtuoso';
import { Scroller } from './scrollbar';
import { ChatMessage } from '../chat-message';

export const ChatMessages = ({
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
    clearTimeout(showButtonTimeoutRef.current);
    if (!atBottom) {
      showButtonTimeoutRef.current = setTimeout(() => setShowButton(true), 500);
    } else {
      setShowButton(false);
    }
  }, [atBottom, setShowButton]);

  useEffect(() => {
    return () => {
      clearTimeout(showButtonTimeoutRef.current);
    };
  }, []);

  const toBottom = () =>
    virtuoso.current.scrollToIndex({
      index: messages.length - 1,
    });

  return (
    <div className="flex flex-col flex-1 overflow-hidden relative h-full">
      <Virtuoso
        data={messages}
        ref={virtuoso}
        className="h-full"
        initialTopMostItemIndex={100000}
        // startReached={loadPrevPage}
        // endReached={loadNextPage}
        // firstItemIndex={firstItemIndex}
        atBottomStateChange={setAtBottom}
        itemContent={(_index, item) => <ChatMessage {...item} />}
        followOutput
        components={{ Scroller }}
      />
      {showButton && (
        <button
          className={clsx(
            'absolute bottom-0',
            'flex w-full items-center justify-center',
            'text-white text-sm',
            'bg-surface',
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
