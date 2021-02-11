import gql from 'graphql-tag';
import { FC, useRef } from 'react';
import { useMutation } from '@apollo/client';
import styled from 'styled-components';
import { useAccess } from '@pepega/utils/useAccess';
import { convertTextToEmojiCode } from '@pepega/utils/emoji';

const CREATE_CLIP_COMMENT = gql`
  mutation createClipComment($input: ClipCommentCreateInput!) {
    createClipComment(input: $input)
  }
`;

const CommentsBottom = styled.div`
  height: 60px;
  display: flex;
  position: relative;

  input {
    width: calc(100% - 20px);
    padding: 0 30px 0 10px;
    height: 36px;
    color: #fff;
    background: #00000040;
    border: none;
    border-radius: 4px;
    font-size: 12px;
    outline: none;
    margin: auto;
  }
`;

interface IProps {
  clipId: string;
}

export const ClipCommentBottom: FC<IProps> = ({ clipId }) => {
  const textInput = useRef<HTMLInputElement>(null);
  const [{ allow: isAllow }] = useAccess();
  let lock = false;

  const [createClipComment] = useMutation(CREATE_CLIP_COMMENT, {
    onCompleted: (data) => {
      if (data.createClipComment && textInput.current) {
        textInput.current.value = '';
        lock = false;
      }
    },
  });

  return (
    <CommentsBottom>
      <input
        disabled={!isAllow}
        ref={textInput}
        maxLength={500}
        type="text"
        placeholder={
          isAllow
            ? 'Написать комментарий...'
            : 'Войдите чтобы писать комментарии'
        }
        onKeyPress={(e) => {
          if (!textInput.current) {
            return null;
          }

          const content = convertTextToEmojiCode(
            textInput.current.value.trim()
          );

          if (e.key === 'Enter' && !lock && content.length > 0) {
            lock = true;
            createClipComment({
              variables: { input: { clipId, content } },
            });
          }
        }}
      />
    </CommentsBottom>
  );
};
