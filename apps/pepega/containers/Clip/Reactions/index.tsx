import { FC, useEffect } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/client';
import { useAccess } from '../../../utils/useAccess';
import { useRouter } from 'next/router';
import { ClipReactionButton } from './Button';
import {
  ThumbUp as ThumbUpIcon,
  ThumbDown as ThumbDownIcon,
} from 'styled-icons/material';

const GET_CLIP_REACTION_AND_STATS = gql`
  query clipReactionAndStats($clipId: ID!) {
    clipReaction(clipId: $clipId) {
      id
      type
    }
    clipReactionStats(clipId: $clipId) {
      id
      likes
      dislikes
    }
  }
`;

const UPDATED_CLIP_REACTION = gql`
  subscription clipReaction($clipId: ID!) {
    clipReaction(clipId: $clipId) {
      id
      type
    }
  }
`;

const UPDATED_CLIP_REACTION_STATS = gql`
  subscription clipReactionStats($clipId: ID!) {
    clipReactionStats(clipId: $clipId) {
      id
      likes
      dislikes
    }
  }
`;

const SET_CLIP_REACTION = gql`
  mutation setClipReaction($clipId: String!, $type: ClipReactionType!) {
    setClipReaction(clipId: $clipId, type: $type)
  }
`;

interface IProps {
  clipId: string;
}

export const ClipReaction: FC<IProps> = ({ clipId }) => {
  const router = useRouter();
  const [{ allow: isUser }] = useAccess();
  const [setClipReaction] = useMutation(SET_CLIP_REACTION);

  const { subscribeToMore, loading, error, data } = useQuery(
    GET_CLIP_REACTION_AND_STATS,
    {
      variables: { clipId },
      ssr: false,
    }
  );

  useEffect(() => {
    subscribeToMore({
      document: UPDATED_CLIP_REACTION,
      variables: { clipId },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev;
        }

        return {
          ...prev,
          clipReaction: {
            ...prev.clipReaction,
            ...subscriptionData.data.clipReaction,
          },
        };
      },
    });
  }, []);

  useEffect(() => {
    subscribeToMore({
      document: UPDATED_CLIP_REACTION_STATS,
      variables: { clipId },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev;
        }

        return {
          ...prev,
          clipReactionStats: {
            ...prev.clipReactionStats,
            ...subscriptionData.data.clipReactionStats,
          },
        };
      },
    });
  }, []);

  if (loading || error) {
    return null;
  }

  const reactionType = data.clipReaction ? data.clipReaction.type : 'none';
  const likes = data.clipReactionStats ? data.clipReactionStats.likes : 0;
  const dislikes = data.clipReactionStats ? data.clipReactionStats.dislikes : 0;

  const needAuth = () => {
    router.push(
      {
        pathname: router.route,
        query: {
          ...router.query,
          authModal: 1,
        },
      },
      `/auth?continue=${router.asPath}`,
      { shallow: true }
    );
  };

  const toggleLike = () => {
    setClipReaction({
      variables: {
        clipId,
        type: reactionType === 'like' ? 'none' : 'like',
      },
    });
  };

  const toggleDislike = () => {
    setClipReaction({
      variables: {
        clipId,
        type: reactionType === 'dislike' ? 'none' : 'dislike',
      },
    });
  };

  return (
    <>
      <ClipReactionButton
        onClick={isUser ? toggleLike : needAuth}
        active={reactionType === 'like'}
        count={likes}
        icon={<ThumbUpIcon size="20px" />}
      />
      <ClipReactionButton
        onClick={isUser ? toggleDislike : needAuth}
        active={reactionType === 'dislike'}
        count={dislikes}
        icon={<ThumbDownIcon size="20px" />}
      />
    </>
  );
};
