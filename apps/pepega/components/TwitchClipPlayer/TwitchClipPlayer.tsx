import { FC } from 'react';
import styled from 'styled-components';

const Box = styled.div`
  position: relative;
  padding-bottom: 56.25%;
`;

const ContentBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
`;

interface IProps {
  autoPlay?: boolean;
  sourceId?: string;
}

export const TwitchClipPlayer: FC<IProps> = ({ sourceId, autoPlay }) => {
  return (
    <Box>
      <ContentBox>
        <Iframe
          src={`https://clips.twitch.tv/embed?clip=${sourceId}&muted=false&autoplay=${
            autoPlay ? 'true' : 'false'
          }`}
          frameBorder="0"
          height="100%"
          allowFullScreen
          width="100%"
        />
      </ContentBox>
    </Box>
  );
};
