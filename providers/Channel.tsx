import gql from 'graphql-tag';
import { FC, useEffect } from 'react';
import { useQuery } from 'react-apollo';

const GET = gql`
  query channel($where: ChannelWhereUniqueInput!) {
    channel(where: $where) {
      id
      name
      title
      avatar
      live
      cost
    }
  }
`;

const UPDATED = gql`
  subscription channel($id: ID!) {
    channel(id: $id) {
      id
      name
      title
      avatar
      live
      cost
    }
  }
`;

interface IProps {
  id: string;
  children: any;
}

const Provider: FC<IProps> = ({ children, id }) => {
  const { loading, error, data, subscribeToMore } = useQuery(GET, {
    variables: { where: { id } }
  });

  useEffect(() => {
    subscribeToMore({
      document: UPDATED,
      variables: { id },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev;
        }

        return {
          ...prev,
          channel: {
            ...prev.channel,
            ...subscriptionData.data.channel
          }
        };
      }
    });
  }, []);

  if (loading || error) {
    return null;
  }

  return children({ channel: data.channel });
};

export default Provider;
