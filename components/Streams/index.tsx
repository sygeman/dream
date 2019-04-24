import gql from 'graphql-tag';
import { FC } from 'react';
import { Query } from 'react-apollo';
import styled from 'styled-components';

import { Grid } from '../../ui/Grid';
import Stream from './Stream';

const GET_CHANNELS_TOP = gql`
  query channelsTop {
    channelsTop {
      id
      cost
      name
      title
      avatar
    }
  }
`;

const StreamsBox = styled.div`
  padding: 20px 10px 0;
`;

const StreamBox = styled.div`
  margin: 6px;
  border-radius: 4px;
  overflow: hidden;
`;

const Streams: FC = () => (
  <Query query={GET_CHANNELS_TOP}>
    {({ data }) => (
      <StreamsBox>
        <Grid
          elementWidth={300}
          maxRows={1}
          items={data.channelsTop || []}
          itemRender={(channel, index) => (
            <StreamBox key={`${channel.id}-${channel.cost}`}>
              <Stream {...channel} livePreview={index < 2} />
            </StreamBox>
          )}
        />
      </StreamsBox>
    )}
  </Query>
);

export default Streams;
