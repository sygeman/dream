import Link from 'next/link';
import { darken, rgba } from 'polished';
import { FC } from 'react';
import styled from 'styled-components';
import useRouter from '../../hooks/useRouter';

const SubItem = styled('a')<{
  active?: boolean;
}>`
  padding: 0 20px 0 70px;
  height: 30px;
  display: flex;
  align-items: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 13px;
  cursor: pointer;
  color: ${({ theme }) => darken(0.2, theme.text1Color)};
  background: ${({ theme, active }) =>
    active ? rgba(theme.main1Color, 0.2) : 'transparent'};

  :hover {
    background: ${({ theme }) => rgba(theme.main1Color, 0.2)};
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
