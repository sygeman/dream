import { FC } from 'react';
import styled from 'styled-components';
import Comment from './Comment';
import CommentsBottom from './CommentsBottom';
import CommentsProvider from '../../providers/Comments';

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

const compactMessages = messages => {
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
  postId: string;
}

export const Comments: FC<IProps> = ({ postId }) => (
  <Box>
    <CommentsContainer>
      <CommentsProvider postId={postId}>
        {({ comments }) => (
          <CommentsBox>
            {compactMessages(comments).map(comment => (
              <Comment key={comment.id} {...comment} />
            ))}
          </CommentsBox>
        )}
      </CommentsProvider>
    </CommentsContainer>
    <CommentsBottom postId={postId} />
  </Box>
);
