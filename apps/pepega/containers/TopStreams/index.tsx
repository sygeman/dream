import gql from 'graphql-tag';
import { FC } from 'react';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import { Grid } from '@dream/pepega-ui';
import { Stream } from './Stream';
import { StreamAdd } from './StreamAdd';

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

type Props = {
  max: number;
  live: number;
  position: StreamsPosition;
  interval: number;
  noAddStream: boolean;
};

export const TopStreams: FC<Props> & {
  defaultProps: Partial<Props>;
} = ({ max, live, position, interval, noAddStream }) => {
  const { data } = useQuery(GET_CHANNELS_TOP, { pollInterval: interval });
  let channels = ((data && data.channelsTop) || []).slice(0, max);

  if (!noAddStream && channels.length < max) {
    channels = [...channels, null];
  }

  if (position === 'line') {
    return (
      <StreamsLineBox>
        <Grid
          elementWidth={320}
          maxRows={1}
          items={channels}
          itemRender={(channel, index) => {
            if (!channel) {
              return (
                <StreamLineBox key={`nochannel`}>
                  <StreamAdd />
                </StreamLineBox>
              );
            }

            return (
              <StreamLineBox key={`${channel.id}-${channel.cost}`}>
                <Stream {...channel} livePreview={index < live} />
              </StreamLineBox>
            );
          }}
        />
      </StreamsLineBox>
    );
  }

  return (
    <StreamsColumnBox>
      {channels.map((channel, index) => {
        if (!channel) {
          return (
            <StreamColumnBox key={`nochannel`}>
              <StreamAdd />
            </StreamColumnBox>
          );
        }

        return (
          <StreamColumnBox key={`${channel.id}-${channel.cost}`}>
            <Stream {...channel} livePreview={index < live} />
          </StreamColumnBox>
        );
      })}
    </StreamsColumnBox>
  );
};

TopStreams.defaultProps = {
  max: 6,
  live: 2,
  position: 'line',
  interval: 10e3,
  noAddStream: false,
};
