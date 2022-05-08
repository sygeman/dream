import { darken, lighten } from 'polished';
import { FC, ReactNode } from 'react';
import styled from 'styled-components';
import { shortNumbers } from '../../utils/count';

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
`;

const Media = styled.div`
  position: relative;
  padding-bottom: 56.25%;
  width: 100%;
  background: ${({ theme }) => darken(0.1, theme.colors.surface)};
`;

const Content = styled.div`
  display: flex;
  font-size: 11.5px;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => darken(0.4, theme.colors.text)};
  width: 100%;
  height: 50px;
  padding: 0 5px;
`;

const Avatar = styled.div`
  padding: 0 5px;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
`;

const AvatarBox = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 100%;
  overflow: hidden;
  background: ${({ theme }) => lighten(0.1, theme.colors.surface)};
`;

const AvatarImg = styled.img`
  width: 100%;
  height: 100%;
`;

const Data = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  flex: 1;
  padding: 0 5px;
  line-height: 16px;
`;

const DataBox = styled.div`
  height: 30px;
`;

const Title = styled.div`
  font-size: 13px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100%;
  text-align: left;
  color: ${({ theme }) => theme.colors.text};
`;

const Description = styled.div`
  font-size: 11px;
`;

const Count = styled.div`
  padding: 0 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 11.5px;
  color: ${({ theme }) => lighten(0.5, theme.colors.surface)};
  font-weight: 500;

  span {
    display: flex;
    align-items: center;
    height: 30px;
    padding: 0 8px;
    border-radius: 4px;
    background: ${({ theme }) => lighten(0.1, theme.colors.surface)};
  }
`;

const IconBox = styled.div`
  margin-right: 8px;
  align-items: center;
  display: flex;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background: ${({ theme }) => darken(0.1, theme.colors.surface)};
  width: 100%;
  height: 100%;
`;

interface IProps {
  media?: ReactNode;
  avatar?: string;
  title?: string;
  description?: string;
  descriptionLink?: string;
  overlay?: ReactNode;
  count?: number;
  countIcon?: ReactNode;
}

export const CardMedia: FC<IProps> = ({
  media,
  avatar,
  title,
  description,
  descriptionLink,
  overlay,
  count,
  countIcon
}) => {
  return (
    <Box>
      <Media>{media}</Media>
      <Content>
        {typeof avatar !== 'undefined' && (
          <Avatar>
            <AvatarBox>{avatar && <AvatarImg src={avatar} />}</AvatarBox>
          </Avatar>
        )}
        <Data>
          <DataBox>
            <Title>{title}</Title>
            <Description>
              {description && (
                <a href={descriptionLink} target="_blank" rel="noreferrer">
                  {description}
                </a>
              )}
            </Description>
          </DataBox>
        </Data>
        {typeof count === 'number' && countIcon && (
          <Count>
            <span>
              <IconBox>{countIcon}</IconBox>
              {shortNumbers(count)}
            </span>
          </Count>
        )}
      </Content>
      {overlay && <Overlay>{overlay}</Overlay>}
    </Box>
  );
};
