import { FC, useRef } from 'react';
import styled from 'styled-components';
import useGridHelper from '../hooks/useGridHelper';

import { IStore } from '../lib/store';

const Container = styled.div`
  display: flex;
  width: 100%;
  overflow: hidden;
`;

const Innner = styled.div<{ gridWidth: number }>`
  width: ${({ gridWidth }) => gridWidth}px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  text-align: center;
`;

export const Grid = styled.div`
  width: 100%;
  display: grid;
  padding: 10px 20px;
  grid-template-columns: repeat(auto-fit, 280px);
  overflow-y: hidden;
`;

export const GridItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 5px;
`;

interface IProps {
  store?: IStore;
  children: any;
}

export const GridContainer: FC<IProps> = ({ children }) => {
  const ref = useRef(null);
  const [countOnRow, gridWidth] = useGridHelper(ref);

  return (
    <Container ref={ref}>
      <Innner gridWidth={gridWidth}>
        {typeof children === 'function' ? children({ countOnRow }) : children}
      </Innner>
    </Container>
  );
};
