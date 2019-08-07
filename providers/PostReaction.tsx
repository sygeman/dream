import gql from 'graphql-tag';
import { FC, useEffect } from 'react';
import { useQuery } from 'react-apollo';

const GET = gql`
  query postReaction($postId: ID!) {
    postReaction(postId: $postId) {
      id
      type
      postId
      userId
    }
  }
`;

const UPDATED = gql`
  subscription postReaction($postId: ID!) {
    postReaction(postId: $postId) {
      id
      type
      postId
      userId
    }
  }
`;

interface IProps {
  postId: string;
  children: any;
}

const Provider: FC<IProps> = ({ children, postId }) => {
  const { loading, error, data, subscribeToMore } = useQuery(GET, {
    variables: { postId },
    ssr: false
  });

  useEffect(() => {
    subscribeToMore({
      document: UPDATED,
      variables: { postId },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev;
        }

        return {
          ...prev,
          postReaction: {
            ...prev.postReaction,
            ...subscriptionData.data.postReaction
          }
        };
      }
    });
  }, []);

  if (loading || error || !data) {
    return null;
  }

  return children({ postReaction: data.postReaction });
};

export default Provider;
