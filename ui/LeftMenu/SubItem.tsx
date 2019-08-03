import Link from 'next/link';
import { darken, lighten } from 'polished';
import { FC } from 'react';
import styled from 'styled-components';
import useRouter from '../../lib/useRouter';

const SubItem = styled('a')<{
  active?: boolean;
}>`
  margin-right: 14px;
  border-radius: 0 16px 16px 0;
  border-left: 4px solid transparent;
  padding: 0 20px 0 56px;
  height: 30px;
  display: flex;
  align-items: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 13px;
  cursor: pointer;
  color: ${({ theme, active }) => darken(active ? 0 : 0.3, theme.text1Color)};
  background: ${({ theme, active }) =>
    active ? lighten(0.05, theme.dark1Color) : 'transparent'};

  :hover {
    background: ${({ theme }) => lighten(0.05, theme.dark1Color)};
  }

  span {
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

interface IProps {
  route: string;
  active?: boolean;
}

export const SubItemMenu: FC<IProps> = ({ route, active, children }) => {
  const router = useRouter();

  return (
    <Link href={route} shallow passHref>
      <SubItem active={active || router.route === route}>
        <span>{children}</span>
      </SubItem>
    </Link>
  );
};
