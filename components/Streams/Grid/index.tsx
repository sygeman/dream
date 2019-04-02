import { FC } from 'react';
import styled from 'styled-components';

import StreamsProvider from '../../../providers/Streams';
import { Grid } from '../../../ui/Grid';
import Stream from './Stream';

const Divider = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.dark2Color};
  margin: 10px;
`;

interface IProps {
  manage?: boolean;
}

const Streams: FC<IProps> = ({ manage }) => (
  <StreamsProvider>
    {({ streams }) => (
      <div style={{ padding: '10px 20px' }}>
        <Grid
          elementWidth={300}
          maxRows={1}
          items={streams}
          itemRender={stream => (
            <div key={stream.id} style={{ padding: 5 }}>
              <Stream stream={stream} manage={manage} />
            </div>
          )}
          afterRedner={<Divider />}
        />
      </div>
    )}
  </StreamsProvider>
);

export default Streams;
