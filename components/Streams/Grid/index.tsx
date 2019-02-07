import { FC } from 'react';
import styled from 'styled-components';

import StreamsProvider from '../../../providers/Streams';
import { Grid, GridContainer, GridItem } from '../../Grid';
import Stream from './Stream';

const Divider = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.dark2Color};
  margin: 10px 25px;
`;

interface IProps {
  manage?: boolean;
}

const Streams: FC<IProps> = ({ manage }) => (
  <GridContainer>
    <StreamsProvider>
      {({ streams }) => {
        return (
          <>
            <Grid>
              {streams.map(stream => (
                <GridItem key={stream.id}>
                  <Stream stream={stream} manage={manage} />
                </GridItem>
              ))}
            </Grid>
            <Divider />
          </>
        );
      }}
    </StreamsProvider>
  </GridContainer>
);

export default Streams;
