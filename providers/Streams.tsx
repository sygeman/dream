import gql from 'graphql-tag';
import { Component, FC } from 'react';
import { Query } from 'react-apollo';

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

interface IPropsInner {
  streams: any;
  streamAdded: () => void;
  streamUpdated: () => void;
  streamRemoved: () => void;
  children: any;
}

class StreamsProviderInner extends Component<IPropsInner> {
  public componentDidMount() {
    this.props.streamAdded();
    this.props.streamUpdated();
    this.props.streamRemoved();
  }

  public render() {
    return this.props.children({
      streams: this.props.streams
    });
  }
}

const StreamsProvider: FC = ({ children }) => (
  <Query query={GET_STREAMS}>
    {({ loading, error, data, subscribeToMore }) => {
      if (loading) {
        return null;
      }

      if (error) {
        return null;
      }

      return (
        <StreamsProviderInner
          streams={data.streams}
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
        >
          {children}
        </StreamsProviderInner>
      );
    }}
  </Query>
);

export default StreamsProvider;
