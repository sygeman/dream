import { FC, useEffect, MutableRefObject, useState } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

type Props = {
  containerRef: MutableRefObject<any>;
  maxRows?: number;
  maxOnRow: number;
  elementWidth: number;
  children: any;
};

export const GridHelper: FC<Props> & { defaultProps: Partial<Props> } = ({
  containerRef,
  maxRows,
  maxOnRow,
  elementWidth,
  children
}) => {
  const [innerWidth, setInnerWidth] = useState(0);
  const [columnCount, setColumnCount] = useState(0);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(([entry]) => {
      const containerWidth = entry.contentRect.width;

      let countOnRow = Math.floor(containerWidth / elementWidth);

      if (countOnRow < 1) {
        countOnRow = 1;
      } else if (countOnRow > maxOnRow) {
        countOnRow = maxOnRow;
      }

      let gridWidth = countOnRow * elementWidth;

      if (gridWidth < elementWidth) {
        gridWidth = elementWidth;
      }

      setColumnCount(countOnRow);
      setInnerWidth(gridWidth);
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [containerRef.current, maxOnRow, elementWidth]);

  return children({
    maxRows,
    maxOnRow,
    elementWidth,
    innerWidth,
    columnCount
  });
};

GridHelper.defaultProps = {
  maxOnRow: 6,
  elementWidth: 100
};
