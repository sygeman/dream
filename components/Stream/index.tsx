import gql from 'graphql-tag';
import { FC } from 'react';
import { Query } from 'react-apollo';
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

interface IProps {
  manage?: boolean;
}

const StreamsWithData: FC<IProps> = ({ manage }) => (
  <Query query={GET_STREAMS}>
    {({ subscribeToMore, loading, error, data }) => {
      if (loading) {
        return null;
      }

      if (error || !data.streams) {
        return null;
      }

      return (
        <Streams
          streams={data.streams}
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
      );
    }}
  </Query>
);

export default StreamsWithData;
