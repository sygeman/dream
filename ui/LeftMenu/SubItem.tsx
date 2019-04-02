import Link from 'next/link';
import { darken, lighten } from 'polished';
import { FC } from 'react';
import styled from 'styled-components';
import useRouter from '../../hooks/useRouter';

const SubItem = styled('a')<{
  active?: boolean;
}>`
  border-left: 4px solid transparent;
  border-color: ${({ active, theme }) =>
    active && darken(0.15, theme.main1Color)};
  padding: 0 20px 0 74px;
  height: 30px;
  display: flex;
  align-items: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 13px;
  cursor: pointer;
  color: ${({ theme, active }) => darken(active ? 0 : 0.2, theme.text1Color)};
  background: ${({ theme, active }) =>
    active ? lighten(0.04, theme.dark1Color) : 'transparent'};

  :hover {
    background: ${({ theme }) => lighten(0.04, theme.dark1Color)};
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
