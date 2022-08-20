import { FC, ReactNode, useEffect, useState } from 'react';
import { useResizeDetector } from 'react-resize-detector';

type Props = {
  items: any[];
  itemRender: (item: any, index: number) => ReactNode;
  maxRows?: number;
  maxOnRow: number;
  elementWidth: number;
  beforeRender?: ReactNode;
  afterRedner?: ReactNode;
};

export const Grid: FC<Props> & { defaultProps: Partial<Props> } = ({
  maxRows,
  items,
  itemRender,
  beforeRender,
  afterRedner,
  maxOnRow,
  elementWidth,
}) => {
  const { width, ref } = useResizeDetector({ handleHeight: false });
  const [innerWidth, setInnerWidth] = useState(0);

  if (maxRows) {
    items = items.slice(0, maxRows * (innerWidth / elementWidth));
  }

  useEffect(() => {
    const containerWidth = width || 0;
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

    setInnerWidth(gridWidth);
  }, [width, maxOnRow, elementWidth]);

  return (
    <div ref={ref} className="flex w-full overflow-hidden">
      <div
        className="flex flex-col overflow-hidden"
        style={{ width: innerWidth, margin: '0 auto' }}
      >
        {beforeRender}
        <div
          className="w-full grid overflow-y-hidden"
          style={{
            gridTemplateColumns: `repeat(auto-fit,${elementWidth}px)`,
          }}
        >
          {items.map(itemRender)}
        </div>
        {afterRedner}
      </div>
    </div>
  );
};

Grid.defaultProps = {
  maxOnRow: 6,
  elementWidth: 100,
};
