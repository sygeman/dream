import { FC, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { ClipComment } from './Comment';
import { ClipCommentBottom } from './CommentsBottom';

const GET_CLIP_COMMENTS = gql`
  query getClipComments($clipId: ID) {
    clipComments(clipId: $clipId) {
      id
      content
      clipId
      authorId
      author {
        id
        name
        avatar
        role
        banned
      }
      createdAt
    }
  }
`;

const CLIP_COMMENT_CREATED = gql`
  subscription clipCommentCreated($clipId: ID!) {
    clipCommentCreated(clipId: $clipId) {
      id
      content
      clipId
      authorId
      author {
        id
        name
        avatar
        role
        banned
      }
      createdAt
    }
  }
`;

const CLIP_COMMENT_REMOVED = gql`
  subscription clipCommentRemoved($clipId: ID!) {
    clipCommentRemoved(clipId: $clipId)
  }
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const CommentsContainer = styled.div`
  display: flex;
  flex: 1;
`;

const CommentsBox = styled.div`
  position: relative;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const compactMessages = (messages) => {
  const compactInterval = 90e3; // 1,5 min

  return messages.map((message, index, array) => {
    let compact = false;

    if (index > 0) {
      const diff =
        parseInt(message.createdAt, 10) -
        parseInt(array[index - 1].createdAt, 10);

      if (
        diff < compactInterval &&
        message.authorId === array[index - 1].authorId
      ) {
        compact = true;
      }
    }

    return { ...message, compact };
  });
};

interface IProps {
  clipId: string;
}

export const ClipComments: FC<IProps> = ({ clipId }) => {
  const { loading, error, data, subscribeToMore } = useQuery(
    GET_CLIP_COMMENTS,
    {
      variables: { clipId },
    }
  );

  useEffect(() => {
    subscribeToMore({
      document: CLIP_COMMENT_CREATED,
      variables: { clipId },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev;
        }

        const newClipComment = subscriptionData.data.clipCommentCreated;

        const isDuplicate =
          prev.clipComments.findIndex((c) => {
            return c.id === newClipComment.id;
          }) >= 0;

        if (isDuplicate) {
          return prev;
        }

        return {
          ...prev,
          clipComments: [...prev.clipComments.slice(-50), newClipComment],
        };
      },
    });
  }, []);

  useEffect(() => {
    subscribeToMore({
      document: CLIP_COMMENT_REMOVED,
      variables: { clipId },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev;
        }
        const messageId = subscriptionData.data.clipCommentRemoved;
        return {
          ...prev,
          clipComments: [
            ...prev.clipComments.filter((message) => {
              return message.id !== messageId;
            }),
          ],
        };
      },
    });
  }, []);

  const comments = loading || error || !data ? [] : data.clipComments;

  return (
    <Box>
      <CommentsContainer>
        <CommentsBox>
          {compactMessages(comments).map((comment) => (
            <ClipComment key={comment.id} {...comment} />
          ))}
        </CommentsBox>
      </CommentsContainer>
      <ClipCommentBottom clipId={clipId} />
    </Box>
  );
};
