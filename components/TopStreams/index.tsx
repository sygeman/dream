import gql from 'graphql-tag';
import { FC } from 'react';
import { Query } from 'react-apollo';
import Link from 'next/link';
import styled from 'styled-components';
import { darken, lighten } from 'polished';
import { Grid, Icon } from '../../ui';
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

const StreamAddBox = styled.div`
  cursor: pointer;
  height: 100%;
  min-height: 150px;
  width: 100%;
  background: ${({ theme }) => darken(0.04, theme.dark1Color)};
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  i {
    font-size: 26px;
    color: ${({ theme }) => lighten(0.5, theme.dark1Color)};
  }
`;

const StreamAddText = styled.div`
  margin-top: 10px;
  font-size: 13px;
  color: ${({ theme }) => lighten(0.5, theme.dark1Color)};
`;

type StreamsPosition = 'line' | 'column';

interface IProps {
  max?: number;
  live?: number;
  position?: StreamsPosition;
  interval?: number;
  noAddStream?: boolean;
}

const StreamAdd = () => (
  <Link href={`/promoter`} passHref>
    <StreamAddBox>
      <Icon type="plus-circle-o" />
      <StreamAddText>Разместить стрим</StreamAddText>
    </StreamAddBox>
  </Link>
);

export const TopStreams: FC<IProps> = ({
  max,
  live,
  position,
  interval,
  noAddStream
}) => (
  <Query query={GET_CHANNELS_TOP} pollInterval={interval}>
    {({ data }) => {
      let channels = ((data && data.channelsTop) || []).slice(0, max);
      const channelsCount = channels.length;

      console.log(channelsCount);

      if (!noAddStream && channelsCount < max) {
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
      } else {
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
