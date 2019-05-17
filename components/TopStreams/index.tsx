import gql from 'graphql-tag';
import { FC } from 'react';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import { Grid } from '../../ui';
import { Stream } from './Stream';

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

const StreamsLineBox = styled.div`
  padding: 20px 20px 0;
`;

const StreamLineBox = styled.div`
  margin: 6px;
`;

const StreamsColumnBox = styled.div`
  padding: 0 10px;
`;

const StreamColumnBox = styled.div`
  margin-bottom: 14px;
`;

type StreamsPosition = 'line' | 'column';

interface IProps {
  max?: number;
  live?: number;
  position?: StreamsPosition;
  interval?: number;
}

export const TopStreams: FC<IProps> = ({ max, live, position, interval }) => (
  <Query query={GET_CHANNELS_TOP} pollInterval={interval}>
    {({ data }) => {
      const channels = ((data && data.channelsTop) || []).slice(0, max);

      if (position === 'line') {
        return (
          <StreamsLineBox>
            <Grid
              elementWidth={300}
              maxRows={1}
              items={channels}
              itemRender={(channel, index) => (
                <StreamLineBox key={`${channel.id}-${channel.cost}`}>
                  <Stream {...channel} livePreview={index < live} />
                </StreamLineBox>
              )}
            />
          </StreamsLineBox>
        );
      } else {
        return (
          <StreamsColumnBox>
            {channels.map((channel, index) => (
              <StreamColumnBox key={`${channel.id}-${channel.cost}`}>
                <Stream {...channel} livePreview={index < live} />
              </StreamColumnBox>
            ))}
          </StreamsColumnBox>
        );
      }
    }}
  </Query>
);

TopStreams.defaultProps = {
  max: 6,
  live: 2,
  position: 'line',
  interval: 10e3
};
