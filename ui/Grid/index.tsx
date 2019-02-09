import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  width: 100%;
  overflow: hidden;
`;

const ContainerInner = styled.div<{ innerWidth: number }>`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: ${({ innerWidth }) => innerWidth}px;
`;

const MainGrid = styled.div<{ elementWidth: number }>`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    ${({ elementWidth }) => elementWidth}px
  );
  overflow-y: hidden;
`;

interface IProps {
  items: any[];
  itemRender: (item: any, index: number) => ReactNode;
  maxRows?: number;
  maxOnRow?: number;
  elementWidth?: number;
  beforeRender?: ReactNode;
  afterRedner?: ReactNode;
}

export const Grid: FC<IProps> = ({
  maxRows,
  items,
  itemRender,
  beforeRender,
  afterRedner,
  maxOnRow,
  elementWidth
}) => {
  const ref = useRef(null);
  const [innerWidth, setInnerWidth] = useState(0);

  if (maxRows) {
    items = items.slice(0, maxRows * (innerWidth / elementWidth));
  }

  useEffect(() => {
    // @ts-ignore
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

      setInnerWidth(gridWidth);
    });

    if (ref.current) {
      resizeObserver.observe(ref.current);
    }

    return () => resizeObserver.disconnect();
  }, [ref.current, maxOnRow, elementWidth]);

  return (
    <Container ref={ref}>
      <ContainerInner innerWidth={innerWidth}>
        {beforeRender}
        <MainGrid elementWidth={elementWidth}>{items.map(itemRender)}</MainGrid>
        {afterRedner}
      </ContainerInner>
    </Container>
  );
};

Grid.defaultProps = {
  maxOnRow: 6,
  elementWidth: 100
};
