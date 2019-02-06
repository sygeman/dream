import { rgba } from 'polished';
import { FC, useRef } from 'react';
import styled from 'styled-components';
import useMeasure from '../../hooks/useMeasure';
import { Icon } from '../Icon';

const PLAY_SIZE = 28;
const PLAY_SCALE_SIZE = PLAY_SIZE + 4;

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

const PreviewBox = styled.div`
  position: relative;
  cursor: pointer;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

interface IPreviewImg {
  url: string;
  blur?: boolean;
}

const PreviewImg = styled('div')<IPreviewImg>`
  background: url("${({ url }) => url}") no-repeat center center;
  background-size: cover;
  width: 100%;
  height: 100%;
  ${({ blur }) => blur && 'filter: blur(20px);'}
`;

const PreviewPlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0;
  top: 0;
  ${({ shadowBottom }) =>
    shadowBottom &&
    'background:linear-gradient(0deg, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75) 10%, transparent 50%);'}
`;

const PreviewPlayBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000000a3;
  height: ${() => PLAY_SIZE}%;
  width: ${() => (56.25 * PLAY_SIZE) / 100}%;
  border-radius: 100%;
  transition: all 0.1s ease-out;

  ${Box}:hover & {
    height: ${() => PLAY_SCALE_SIZE}%;
    width: ${() => (56.25 * PLAY_SCALE_SIZE) / 100}%;
  }

  i {
    margin-left: ${({ width }) => width * (1 / 52)}px;
    font-size: ${({ width }) => width * (1 / 8)}px;
  }
`;

const PreviewTags = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  margin: 10px;
  font-size: ${({ width }) => width * (1 / 24)}px;
`;

const PreviewBlurText = styled.div`
  padding: 4px 8px;
  background: #0000005e;
  border-radius: 3px;
  margin-left: 5px;
`;

const Views = styled.div`
  display: flex;

  i {
    display: flex;
    align-items: center;
    margin-right: ${({ width }) => width * (1 / 40)}px;
  }
`;

const Date = styled.div`
  display: flex;
`;

const Bottom = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  padding: ${({ width }) => width * (1 / 40)}px;
  width: 100%;
  font-size: ${({ width }) => width * (1 / 24)}px;
  color: ${({ theme }) => rgba(theme.text1Color, 0.9)};
`;

const BottomRight = styled.div`
  display: flex;
  margin-left: auto;
`;

interface IProps {
  onClick?: () => void;
  cover?: string;
  nsfw?: boolean;
  spoiler?: boolean;
  date?: string;
  views?: string;
}

export const VideoPreview: FC<IProps> = ({
  onClick,
  cover,
  nsfw,
  spoiler,
  date,
  views
}) => {
  const box = useRef(null);
  const { width } = useMeasure(box)[0];

  return (
    <Box ref={box}>
      <ContentBox>
        <PreviewBox onClick={onClick}>
          <PreviewImg url={cover} blur={nsfw || spoiler} />
          <PreviewTags width={width}>
            {nsfw && <PreviewBlurText>NSWF</PreviewBlurText>}
            {spoiler && <PreviewBlurText>Спойлер</PreviewBlurText>}
          </PreviewTags>
          {cover && (
            <PreviewPlay shadowBottom={date || views}>
              <PreviewPlayBox width={width}>
                <Icon type="play" />
              </PreviewPlayBox>
            </PreviewPlay>
          )}
          <Bottom width={width}>
            {views && (
              <Views width={width}>
                <Icon type="eye" /> {views}
              </Views>
            )}
            <BottomRight>{date && <Date>{date}</Date>}</BottomRight>
          </Bottom>
        </PreviewBox>
      </ContentBox>
    </Box>
  );
};
