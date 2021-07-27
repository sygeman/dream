import React, { useEffect, useRef } from 'react';
import { Virtuoso, VirtuosoHandle } from 'react-virtuoso';
import { Scroller } from './scrollbar';

export const ChatMessages = ({
  items,
  loadNextPage,
  loadPrevPage,
  initialTopMostItemIndex,
  firstItemIndex,
}) => {
  const virtuoso = useRef<VirtuosoHandle>(null);

  useEffect(() => {
    virtuoso.current.scrollToIndex({
      index: initialTopMostItemIndex,
      align: 'center',
    });
  }, []);

  return (
    <Virtuoso
      data={items}
      ref={virtuoso}
      className="h-full"
      startReached={loadPrevPage}
      endReached={loadNextPage}
      firstItemIndex={firstItemIndex}
      itemContent={(index, item) => (
        <div>
          {index}. {item?.name}
        </div>
      )}
      components={{ Scroller }}
    />
  );
};
