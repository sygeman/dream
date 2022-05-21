import Link from 'next/link';
import { darken, lighten } from 'polished';
import { FC } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const SubItem = styled('a')<{
  active?: boolean;
}>`
  border-radius: 0;
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
  color: ${({ theme, active }) => darken(active ? 0 : 0.3, theme.colors.text)};
  background: ${({ theme, active }) =>
    active ? lighten(0.05, theme.colors.background) : 'transparent'};

  :hover {
    background: ${({ theme }) => lighten(0.05, theme.colors.background)};
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
  children?: React.ReactNode;
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
