import Link from 'next/link';
import { darken, lighten } from 'polished';
import { FC } from 'react';
import styled from 'styled-components';
import { useRouter } from '../../hooks/useRouter';
import { Icon } from '../Icon';

const Item = styled.a<{ active: boolean }>`
  border-left: 4px solid transparent;
  border-color: ${({ active, theme }) =>
    active && darken(0.1, theme.main1Color)};
  border-radius: 0;
  margin: 0;
  font-size: 13px;
  position: relative;
  height: 34px;
  display: flex;
  align-items: center;
  cursor: pointer;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  background: ${({ active, theme }) =>
    active && lighten(0.06, theme.dark1Color)};

  :hover {
    background: ${({ theme }) => lighten(0.06, theme.dark1Color)};
  }

  i {
    height: 100%;
    width: 56px;
    display: flex;
    justify-content: center;
    align-items: center;
    left: 20px;
    font-size: 17px;
    color: ${({ theme, active }) =>
      active ? lighten(0.7, theme.accent2Color) : theme.accent2Color};
  }
`;

const ItemIcon = styled.div``;

const ItemTitle = styled.div`
  display: flex;
  flex: 1;
`;

const ItemBadge = styled.div<{ active: boolean }>`
  padding: 0 15px;
  color: ${({ theme, active }) =>
    active ? lighten(0.2, theme.accent2Color) : theme.accent2Color};
`;

const SubItemMenuBox = styled.div``;

interface IProps {
  route: string;
  title: string;
  icon: string;
  equal?: boolean;
  showContentAlways?: boolean;
  noClick?: boolean;
  badge?: any;
}

export const MenuItem: FC<IProps> = ({
  route,
  title,
  icon,
  children,
  equal,
  showContentAlways,
  noClick,
  badge
}) => {
  const router = useRouter();

  const active = equal
    ? router.route === route
    : router.route.search(`${route}`) >= 0;

  if (noClick) {
    return (
      <>
        <Item active={active}>
          <ItemIcon>
            <Icon type={icon} />
          </ItemIcon>
          <ItemTitle>{title}</ItemTitle>
          {badge && <ItemBadge active={active}>{badge}</ItemBadge>}
        </Item>
        {(showContentAlways || active) && (
          <SubItemMenuBox>{children}</SubItemMenuBox>
        )}
      </>
    );
  }

  return (
    <>
      <Link href={route} shallow passHref>
        <Item active={active}>
          <ItemIcon>
            <Icon type={icon} />
          </ItemIcon>
          <ItemTitle>{title}</ItemTitle>
          {badge && <ItemBadge active={active}>{badge}</ItemBadge>}
        </Item>
      </Link>
      {(showContentAlways || active) && (
        <SubItemMenuBox>{children}</SubItemMenuBox>
      )}
    </>
  );
};
