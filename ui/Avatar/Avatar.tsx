import { FC } from 'react';
import { lighten } from 'polished';
import styled from 'styled-components';

const DOT_BORDER = 2;

const Box = styled.div`
  position: relative;
  width: 32px;
  height: 32px;
`;

const AvatarBox = styled.div`
  min-height: 32px;
  min-width: 32px;
  width: 32px;
  height: 32px;
  border-radius: 100%;
  overflow: hidden;
`;

const AvatarImg = styled.img`
  height: 100%;
  width: 100%;
`;

const Dot = styled('div')<{ dotColor: string }>`
  position: absolute;
  right: -${DOT_BORDER}px;
  bottom: -${DOT_BORDER}px;
  height: 12px;
  width: 12px;
  border-radius: 100%;
  border: ${DOT_BORDER}px solid ${({ theme }) => lighten(0.1, theme.dark2Color)};
  background: ${({ dotColor }) => dotColor};
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface IProps {
  avatar: string;
  dot?: boolean;
  dotColor?: string;
  onClick?: () => void;
}

export const Avatar: FC<IProps> = ({ avatar, dot, dotColor, onClick }) => (
  <Box>
    <AvatarBox onClick={onClick}>
      {avatar && <AvatarImg src={avatar} />}
    </AvatarBox>
    {dot && <Dot dotColor={dotColor} />}
  </Box>
);

Avatar.defaultProps = {
  dotColor: '#3fa447'
};
