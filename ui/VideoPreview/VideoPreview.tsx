import { rgba } from 'polished';
import { FC, useEffect, useRef, useState } from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import styled from 'styled-components';
import { humanNumbers } from '../../utils/count';
import { Icon } from '../Icon';

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

const PreviewTags = styled.div<{ width: number }>`
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  margin: 10px;
  font-size: ${({ width }) => width * (1 / 27)}px;
`;

const PreviewBlurText = styled.div`
  padding: 4px 8px;
  background: #000000a3;
  color: ${({ theme }) => rgba(theme.text1Color, 0.8)};
  border-radius: 3px;
  margin-left: 5px;
`;

const Views = styled.div<{ width: number }>`
  display: flex;
  background: #000000a3;
  color: ${({ theme }) => rgba(theme.text1Color, 0.8)};
  padding: 5px 10px;
  border-radius: 5px;

  i {
    display: flex;
    align-items: center;
    margin-right: ${({ width }) => width * (1 / 40)}px;
  }
`;

const Date = styled.div`
  display: flex;
  background: #000000a3;
  color: ${({ theme }) => rgba(theme.text1Color, 0.8)};
  padding: 5px 10px;
  border-radius: 5px;
`;

const Bottom = styled.div<{ width: number }>`
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  padding: ${({ width }) => width * (1 / 40)}px;
  width: 100%;
  font-size: ${({ width }) => width * (1 / 27)}px;
  color: ${({ theme }) => rgba(theme.text1Color, 0.8)};
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
  views?: number;
}

export const VideoPreview: FC<IProps> = ({
  onClick,
  cover,
  nsfw,
  spoiler,
  date,
  views
}) => {
  const [width, setWidth] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(([entry]) => {
      const containerWidth = entry.contentRect.width;
      setWidth(containerWidth);
    });

    if (ref.current) {
      resizeObserver.observe(ref.current);
    }

    return () => resizeObserver.disconnect();
  }, [ref.current]);

  return (
    <Box ref={ref}>
      <ContentBox>
        <PreviewBox onClick={onClick}>
          <PreviewImg url={cover} blur={nsfw || spoiler} />
          <PreviewTags width={width}>
            {nsfw && <PreviewBlurText>NSWF</PreviewBlurText>}
            {spoiler && <PreviewBlurText>Спойлер</PreviewBlurText>}
          </PreviewTags>
          <Bottom width={width}>
            {views && (
              <Views width={width}>
                <Icon type="eye" /> {humanNumbers(views)}
              </Views>
            )}
            <BottomRight>{date && <Date>{date}</Date>}</BottomRight>
          </Bottom>
        </PreviewBox>
      </ContentBox>
    </Box>
  );
};
