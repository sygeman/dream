import Link from 'next/link';
import { lighten, rgba } from 'polished';
import { FC } from 'react';
import styled from 'styled-components';
import useRouter from '../../hooks/useRouter';
import { Icon } from '../Icon';

const Item = styled.a<{ active: boolean }>`
  font-size: 14px;
  position: relative;
  height: 38px;
  display: flex;
  align-items: center;
  cursor: pointer;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  background: ${({ active, theme }) => active && rgba(theme.main1Color, 0.5)};

  :hover {
    background: ${({ theme }) => rgba(theme.main1Color, 0.5)};
  }

  i {
    height: 100%;
    width: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    left: 20px;
    font-size: 19px;
    color: ${({ theme, active }) =>
      active ? lighten(0.2, theme.accent2Color) : theme.accent2Color};
  }
`;

const SubItemMenuBox = styled.div``;

interface IProps {
  route: string;
  title: string;
  icon: string;
  equal?: boolean;
}

export const MenuItem: FC<IProps> = ({
  route,
  title,
  icon,
  children,
  equal
}) => {
  const router = useRouter();

  const active = equal
    ? router.route === route
    : router.route.search(`${route}`) >= 0;

  return (
    <>
      <Link href={route} shallow passHref>
        <Item active={active}>
          <Icon type={icon} /> {title}
        </Item>
      </Link>
      {active && <SubItemMenuBox>{children}</SubItemMenuBox>}
    </>
  );
};
