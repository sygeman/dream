import { useCallback, useEffect, useState } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

const getCalcCountOnRow = width => {
  const GRID_ELEMENT_WIDTH = 280;
  const GRID_PADDING_ONE = 20;
  const GRID_PADDING = GRID_PADDING_ONE * 2;

  let countOnRow = Math.floor((width - GRID_PADDING) / GRID_ELEMENT_WIDTH);

  if (countOnRow < 1) {
    countOnRow = 1;
  } else if (countOnRow > 6) {
    countOnRow = 6;
  }

  let gridWidth = countOnRow * GRID_ELEMENT_WIDTH + GRID_PADDING;

  if (gridWidth < GRID_ELEMENT_WIDTH + GRID_PADDING) {
    gridWidth = GRID_ELEMENT_WIDTH + GRID_PADDING;
  }

  return [countOnRow, gridWidth];
};

function getSize(el) {
  return getCalcCountOnRow(el ? el.offsetWidth : 0);
}

function useGridHelper(ref) {
  const [componentSize, setComponentSize] = useState(
    getSize(ref ? ref.current : null)
  );

  const handleResize = useCallback(() => {
    if (ref.current) {
      setComponentSize(getSize(ref.current));
    }
  }, [ref]);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    handleResize();

    let resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(ref.current);

    return () => {
      resizeObserver.disconnect();
      resizeObserver = null;
    };
  }, []);

  return componentSize;
}

export default useGridHelper;
