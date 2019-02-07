import { FC } from 'react';
import styled from 'styled-components';

import StreamsProvider from '../../../providers/Streams';
import Stream from './Stream';

interface IProps {
  manage?: boolean;
}

const Box = styled.div`
  min-width: 100%;
`;

const StreamBox = styled.div`
  margin-bottom: 2px;

  :last-child {
    margin-bottom: 0;
  }
`;

const StreamsWithData: FC<IProps> = ({ manage }) => (
  <StreamsProvider>
    {({ streams }) => (
      <Box>
        {streams.map(stream => (
          <StreamBox key={stream.id}>
            <Stream stream={stream} manage={manage} />
          </StreamBox>
        ))}
      </Box>
    )}
  </StreamsProvider>
);

export default StreamsWithData;
