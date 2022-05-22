import { FC, useEffect } from 'react';
import gql from 'graphql-tag';
import { darken } from 'polished';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';
import { TwitchClipPlayer } from '@dream/pepega/components-old';
import { ClipReaction } from './Reactions';
import { ClipShare } from './Share';
import { ClipComments } from './Comments';
import { useAccess } from '@dream/pepega/utils-old';

const SET_CLIP_HISTORY = gql`
  mutation setClipHistory($clipId: ID!) {
    setClipHistory(clipId: $clipId)
  }
`;

const Box = styled.div`
  flex-direction: column;
  display: flex;
  flex: 1;
  background: ${({ theme }) => '#262841'};
  border-radius: 5px;
  overflow: hidden;
`;

const ContentBox = styled.div`
  background: ${({ theme }) => darken(0.1, '#262841')};
`;

const Bottom = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
`;

const CommentsBox = styled.div`
  display: flex;
  flex: 1;
  position: relative;
  background: ${({ theme }) => '#262841'};
  border-top: 1px solid #1e1d22;
  border-radius: 0 0 5px 5px;
  overflow: hidden;
`;

interface IProps {
  clipId?: string;
  autoPlay?: boolean;
}

export const Clip: FC<IProps> = ({ clipId, autoPlay }) => {
  const [setClipHistory] = useMutation(SET_CLIP_HISTORY);
  const [{ allow: isUser }] = useAccess();

  useEffect(() => {
    if (isUser) {
      setClipHistory({ variables: { clipId } });
    }
  }, [isUser]);

  if (!clipId) {
    return null;
  }

  return (
    <Box>
      <ContentBox>
        <TwitchClipPlayer sourceId={clipId} autoPlay={autoPlay} />
      </ContentBox>
      <Bottom>
        <ClipReaction clipId={clipId} />
        <ClipShare clipId={clipId} />
      </Bottom>
      <CommentsBox>
        <ClipComments clipId={clipId} />
      </CommentsBox>
    </Box>
  );
};
