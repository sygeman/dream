import gql from 'graphql-tag';
import { FC, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { ChannelPromoterWithChannel } from './WithChannel';

const GET_CHANNEL_PROMOTER = gql`
  query channelPromoter($where: ChannelPromoterWhereUniqueInput!) {
    channelPromoter(where: $where) {
      id
      active
      cost
      channelId
    }
  }
`;

const UPDATED_CHANNEL_PROMOTER = gql`
  subscription channelPromoter($id: ID!) {
    channelPromoter(id: $id) {
      id
      active
      cost
      channelId
    }
  }
`;

interface IProps {
  channelPromoterId: string;
}

export const ChannelPromoter: FC<IProps> = ({ channelPromoterId }) => {
  const { loading, error, data, subscribeToMore } = useQuery(
    GET_CHANNEL_PROMOTER,
    {
      variables: { where: { id: channelPromoterId } }
    }
  );

  useEffect(() => {
    subscribeToMore({
      document: UPDATED_CHANNEL_PROMOTER,
      variables: { id: channelPromoterId },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev;
        }

        return {
          ...prev,
          channelPromoter: {
            ...prev.channelPromoter,
            ...subscriptionData.data.channelPromoter
          }
        };
      }
    });
  }, []);

  if (loading || error) {
    return null;
  }

  return <ChannelPromoterWithChannel channelPromoter={data.channelPromoter} />;
};

export default ChannelPromoter;
