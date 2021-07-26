import React, { useCallback, useEffect } from 'react';
import { FixedSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import { Scrollbars } from 'react-custom-scrollbars';
import AutoSizer from 'react-virtualized-auto-sizer';

const CustomScrollbars = ({ onScroll, forwardedRef, style, children }) => {
  const refSetter = useCallback((scrollbarsRef) => {
    if (scrollbarsRef) {
      forwardedRef(scrollbarsRef.view);
    } else {
      forwardedRef(null);
    }
  }, []);

  return (
    <Scrollbars
      ref={refSetter}
      style={{ ...style, overflow: 'hidden' }}
      onScroll={onScroll}
    >
      {children}
    </Scrollbars>
  );
};

const CustomScrollbarsVirtualList = React.forwardRef((props, ref) => (
  <CustomScrollbars {...props} forwardedRef={ref} />
));

const LOADING = 1;
const LOADED = 2;
let itemStatusMap = {};

const isItemLoaded = (index) => !!itemStatusMap[index];
const loadMoreItems = (startIndex, stopIndex) => {
  console.log('load more', startIndex, stopIndex);

  for (let index = startIndex; index <= stopIndex; index++) {
    itemStatusMap[index] = LOADING;
  }
  return new Promise((resolve) =>
    setTimeout(() => {
      for (let index = startIndex; index <= stopIndex; index++) {
        itemStatusMap[index] = LOADED;
      }
      resolve();
    }, 2500)
  );
};

const Row = ({ index, style }) => {
  let label;
  if (itemStatusMap[index] === LOADED) {
    label = `Row ${index}`;
  } else {
    label = (
      <div className="w-full h-full p-2">
        <div className="w-full h-full rounded bg-surface"></div>
      </div>
    );
  }
  return (
    <div className="ListItem" style={style}>
      {label}
    </div>
  );
};

export const ChatMessages = () => {
  const listRef = React.useRef();

  useEffect(() => {
    setTimeout(() => {
      if (listRef?.current) {
        listRef?.current?._listRef?.scrollToItem(100, 'center');
      }
    }, 100);
  }, []);

  const totalCount = 100000;

  return (
    <InfiniteLoader
      ref={listRef}
      isItemLoaded={isItemLoaded}
      itemCount={totalCount}
      minimumBatchSize={25}
      loadMoreItems={loadMoreItems}
    >
      {({ onItemsRendered, ref }) => (
        <AutoSizer>
          {({ height, width }) => (
            <List
              className="List"
              height={height}
              itemCount={totalCount}
              itemSize={30}
              outerElementType={CustomScrollbarsVirtualList}
              onItemsRendered={onItemsRendered}
              ref={ref}
              width={width}
            >
              {Row}
            </List>
          )}
        </AutoSizer>
      )}
    </InfiniteLoader>
  );
};
