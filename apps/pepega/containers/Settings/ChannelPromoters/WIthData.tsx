import gql from 'graphql-tag';
import { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { ChannelPromotersList } from './List';

const GET_CHANNEL_PROMOTERS = gql`
  query channelPromoters {
    channelPromoters {
      id
    }
  }
`;

const CHANNEL_PROMOTER_CREATED = gql`
  subscription channelPromoterCreated {
    channelPromoterCreated {
      id
    }
  }
`;

const CHANNEL_PROMOTER_DELETED = gql`
  subscription channelPromoterDeleted {
    channelPromoterDeleted {
      id
    }
  }
`;

export const ChannelPromotersWithData = () => {
  const { subscribeToMore, loading, error, data } = useQuery(
    GET_CHANNEL_PROMOTERS
  );

  useEffect(() => {
    subscribeToMore({
      document: CHANNEL_PROMOTER_CREATED,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev;
        }

        const channelPromoter = subscriptionData.data.channelPromoterCreated;

        if (
          prev.channelPromoters.findIndex(c => c.id === channelPromoter.id) < 0
        ) {
          return {
            ...prev,
            channelPromoters: [
              ...prev.channelPromoters.slice(-50),
              channelPromoter
            ]
          };
        }
      }
    });
  }, []);

  useEffect(() => {
    subscribeToMore({
      document: CHANNEL_PROMOTER_DELETED,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev;
        }

        const { id } = subscriptionData.data.channelPromoterDeleted;

        return {
          ...prev,
          channelPromoters: [...prev.channelPromoters.filter(c => c.id !== id)]
        };
      }
    });
  }, []);

  if (loading || error || !data || !data.channelPromoters) {
    return null;
  }

  return <ChannelPromotersList channelPromoters={data.channelPromoters} />;
};
