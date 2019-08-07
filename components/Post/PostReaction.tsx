import gql from 'graphql-tag';
import { FC, useEffect } from 'react';
import { useQuery } from 'react-apollo';
import PostHelper from '../Post';
import { PostReactionType } from '../../generated/globalTypes';

const GET_POST_REACTION = gql`
  query postReaction($postId: ID!) {
    postReaction(postId: $postId) {
      id
      type
      postId
      userId
    }
  }
`;

const UPDATED_POST_REACTION = gql`
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
  likes: number;
  dislikes: number;
}

export const PostReaction: FC<IProps> = ({ postId, likes, dislikes }) => {
  const { loading, error, data, subscribeToMore } = useQuery(
    GET_POST_REACTION,
    {
      variables: { postId },
      ssr: false
    }
  );

  useEffect(() => {
    subscribeToMore({
      document: UPDATED_POST_REACTION,
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

  const postReaction = data.postReaction;

  const reaction = postReaction ? postReaction.type : 'none';

  return (
    <>
      <PostHelper.ReactionButton
        id={postId}
        type="like"
        state={reaction === PostReactionType.like}
        count={likes}
        icon="thumb-up"
      />
      <PostHelper.ReactionButton
        id={postId}
        type="dislike"
        state={reaction === PostReactionType.dislike}
        count={dislikes}
        icon="thumb-down"
      />
    </>
  );
};
