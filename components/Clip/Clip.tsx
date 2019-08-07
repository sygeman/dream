import { FC } from 'react';
import { darken } from 'polished';
import styled from 'styled-components';
import { TwitchClipPlayer } from '../../ui';
import { ClipComments } from './Comments';

const Box = styled.div`
  flex-direction: column;
  display: flex;
  flex: 1;
  background: ${({ theme }) => theme.dark2Color};
  border-radius: 5px;
  overflow: hidden;
`;

const ContentBox = styled.div`
  background: ${({ theme }) => darken(0.1, theme.dark2Color)};
`;

const CommentsBox = styled.div`
  display: flex;
  flex: 1;
  position: relative;
  background: ${({ theme }) => theme.dark2Color};
  border-top: 1px solid #1e1d22;
  border-radius: 0 0 5px 5px;
  overflow: hidden;
`;

interface IProps {
  clipId?: string;
  autoPlay?: boolean;
}

export const Clip: FC<IProps> = ({ clipId, autoPlay }) => {
  return (
    <Box>
      <ContentBox>
        <TwitchClipPlayer sourceId={clipId} autoPlay={autoPlay} />
      </ContentBox>

      <CommentsBox>
        <ClipComments clipId={clipId} />
      </CommentsBox>
    </Box>
  );
};
