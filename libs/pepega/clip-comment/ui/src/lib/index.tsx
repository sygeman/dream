import { FC } from 'react';
import styled from 'styled-components';
import { ClipComment } from './Comment';
import { ClipCommentBottom } from './CommentsBottom';
import {
  useClipCommentsQuery,
  useClipCommentCreatedSubscription,
  useClipCommentRemovedSubscription,
} from './clip-comment.api';

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
        message.userId === array[index - 1].userId
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
  const clipCommentsQuery = useClipCommentsQuery({
    variables: { clipId },
  });

  useClipCommentCreatedSubscription({
    variables: { clipId },
    onSubscriptionData: ({ subscriptionData }) => {
      if (!subscriptionData.data) return;

      const newClipComment = subscriptionData.data.clipCommentCreated;

      console.log({ newClipComment });

      clipCommentsQuery.updateQuery((prev) => {
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
      });
    },
  });

  useClipCommentRemovedSubscription({
    variables: { clipId },
    onSubscriptionData: ({ subscriptionData }) => {
      if (!subscriptionData.data) return;

      const messageId = subscriptionData.data.clipCommentRemoved;

      console.log({ messageId });

      clipCommentsQuery.updateQuery((prev) => {
        return {
          ...prev,
          clipComments: [
            ...prev.clipComments.filter((message) => {
              return message.id !== messageId;
            }),
          ],
        };
      });
    },
  });

  const comments =
    clipCommentsQuery.loading ||
    clipCommentsQuery.error ||
    !clipCommentsQuery.data
      ? []
      : clipCommentsQuery.data.clipComments;

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
