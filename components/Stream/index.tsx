import gql from 'graphql-tag';
import { inject, observer } from 'mobx-react';
import { FC } from 'react';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import { IStore } from '../../lib/store';
import Streams from './Streams';

const GET_STREAMS = gql`
  query streams {
    streams {
      id
      online
      channel
      channelId
    }
  }
`;

const STREAM_ADDED = gql`
  subscription streamAdded {
    streamAdded {
      id
      online
      channel
      channelId
    }
  }
`;

const STREAM_UPDATED = gql`
  subscription streamUpdated {
    streamUpdated {
      id
      online
      channel
      channelId
    }
  }
`;

const STREAM_REMOVED = gql`
  subscription streamRemoved {
    streamRemoved
  }
`;

const Box = styled.div<{ gridWidth: number }>`
  display: flex;
  flex-direction: column;
  width: ${({ gridWidth }) => gridWidth}px;
  margin: 0 auto;
`;

const Grid = styled.div`
  width: 100%;
  display: grid;
  padding: 10px 20px;
  grid-template-columns: repeat(auto-fit, 280px);
  overflow-y: hidden;
`;

const Divider = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.dark2Color};
  margin: 10px 25px;
`;

interface IProps {
  manage?: boolean;
  store?: IStore;
}

const StreamsWithData: FC<IProps> = ({ manage, store }) => (
  <Box gridWidth={store.gridWidth}>
    <Query query={GET_STREAMS}>
      {({ subscribeToMore, loading, error, data }) => {
        if (loading) {
          return null;
        }

        if (error || !data.streams || store.gridWidth === 0) {
          return null;
        }

        return (
          <>
            <Grid>
              <Streams
                streams={data.streams.slice(0, store.gridCountOnRow)}
                manage={manage}
                streamAdded={() =>
                  subscribeToMore({
                    document: STREAM_ADDED,
                    updateQuery: (prev, { subscriptionData }) => {
                      if (!subscriptionData.data) {
                        return prev;
                      }
                      const newStream = subscriptionData.data.streamAdded;

                      return {
                        ...prev,
                        streams: [...prev.streams, newStream]
                      };
                    }
                  })
                }
                streamUpdated={() =>
                  subscribeToMore({
                    document: STREAM_UPDATED,
                    updateQuery: (prev, { subscriptionData }) => {
                      if (!subscriptionData.data) {
                        return prev;
                      }
                      const stream = subscriptionData.data.streamUpdated;

                      return {
                        ...prev,
                        streams: prev.streams.map(s => {
                          if (s.id !== stream.id) {
                            return s;
                          }

                          return stream;
                        })
                      };
                    }
                  })
                }
                streamRemoved={() =>
                  subscribeToMore({
                    document: STREAM_REMOVED,
                    updateQuery: (prev, { subscriptionData }) => {
                      if (!subscriptionData.data) {
                        return prev;
                      }
                      const streamId = subscriptionData.data.streamRemoved;

                      return {
                        ...prev,
                        streams: prev.streams.filter(s => s.id !== streamId)
                      };
                    }
                  })
                }
              />
            </Grid>
            <Divider />
          </>
        );
      }}
    </Query>
  </Box>
);

export default inject('store')(observer(StreamsWithData));
