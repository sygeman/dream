import { rgba } from 'polished';
import { FC } from 'react';
import styled from 'styled-components';
import { Icon } from '../../ui/Icon';

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
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.75),
    rgba(0, 0, 0, 0.75) 10%,
    transparent 25%
  );
`;

const PreviewPlayBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000000a3;
  height: 50px;
  width: 50px;
  border-radius: 100%;
  transition: all 0.1s ease-out;

  ${Box}:hover & {
    height: 60px;
    width: 60px;
  }

  i {
    margin-left: 8px;
    font-size: 45px;
  }
`;

const PreviewTags = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  margin: 10px;
`;

const PreviewBlurText = styled.div`
  padding: 4px 8px;
  background: #0000005e;
  border-radius: 3px;
  font-size: 12.5px;
  margin-left: 5px;
`;

const Views = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  margin: 10px;
  font-size: 11px;
  color: ${({ theme }) => rgba(theme.text1Color, 0.9)};

  i {
    display: flex;
    align-items: center;
    margin-right: 5px;
    font-size: 11px;
  }
`;

const Date = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  display: flex;
  margin: 10px;
  font-size: 11.5px;
  color: ${({ theme }) => rgba(theme.text1Color, 0.9)};
`;

interface IProps {
  onClick?: () => void;
  cover?: string;
  nsfw?: boolean;
  spoiler?: boolean;
  date?: string;
  views?: string;
}

const GridPreview: FC<IProps> = ({
  onClick,
  cover,
  nsfw,
  spoiler,
  date,
  views
}) => (
  <Box>
    <ContentBox>
      <PreviewBox onClick={onClick}>
        <PreviewImg url={cover} blur={nsfw || spoiler} />
        <PreviewTags>
          {nsfw && <PreviewBlurText>NSWF</PreviewBlurText>}
          {spoiler && <PreviewBlurText>Спойлер</PreviewBlurText>}
        </PreviewTags>
        <PreviewPlay>
          <PreviewPlayBox>
            <Icon type="play" />
          </PreviewPlayBox>
        </PreviewPlay>
        {views && (
          <Views>
            <Icon type="eye" /> {views}
          </Views>
        )}
        {date && <Date>{date}</Date>}
      </PreviewBox>
    </ContentBox>
  </Box>
);

export default GridPreview;
