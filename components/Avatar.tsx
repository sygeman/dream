import { FC } from 'react';
import styled from '../theme';

const AuthorAvatar = styled.div`
  min-height: 32px;
  min-width: 32px;
  width: 32px;
  height: 32px;
  border-radius: 100%;
  overflow: hidden;
  background: ${({ theme }) => theme.dark1Color};
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;

const AuthorAvatarImg = styled.img`
  height: 100%;
  width: 100%;
`;

interface IProps {
  avatar: string;
  onClick?: () => void;
}

const Avatar: FC<IProps> = ({ avatar, onClick }) => (
  <AuthorAvatar onClick={onClick}>
    {avatar && <AuthorAvatarImg src={avatar} />}
  </AuthorAvatar>
);

export default Avatar;
