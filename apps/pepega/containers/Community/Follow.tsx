import { FC, useEffect } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Button } from '@pepega/pepega-ui';

const GET_COMMUNITY_FOLLOW = gql`
  query getCommunityFollow($communityId: ID!) {
    communityFollow(communityId: $communityId) {
      id
      communityId
      userId
      follow
    }
  }
`;

const SET_COMMUNITY_FOLLOW = gql`
  mutation setCommunityFollow($input: SetCommunityFollowInput!) {
    setCommunityFollow(input: $input) {
      id
    }
  }
`;

const UPDATED_COMMUNITY_FOLLOW = gql`
  subscription communityFollow($communityId: ID!) {
    communityFollow(communityId: $communityId) {
      id
      communityId
      userId
      follow
    }
  }
`;

interface Props {
  communityId: string;
}

export const CommunityFollow: FC<Props> = ({ communityId }) => {
  const { loading, error, data, subscribeToMore } = useQuery(
    GET_COMMUNITY_FOLLOW,
    {
      variables: { communityId },
      ssr: false,
    }
  );

  useEffect(() => {
    subscribeToMore({
      document: UPDATED_COMMUNITY_FOLLOW,
      variables: { communityId },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev;
        }

        return {
          ...prev,
          communityFollow: {
            ...prev.communityFollow,
            ...subscriptionData.data.communityFollow,
          },
        };
      },
    });
  }, []);

  const [setCommunityFollow] = useMutation(SET_COMMUNITY_FOLLOW);

  if (loading || error || !data) {
    return null;
  }

  const isFollow = data.communityFollow ? data.communityFollow.follow : false;

  return (
    <Button
      onClick={() =>
        setCommunityFollow({
          variables: {
            input: {
              communityId,
              follow: !isFollow,
            },
          },
        })
      }
    >
      {isFollow ? 'Перестать отслеживать' : 'Отслеживать'}
    </Button>
  );
};
