import Link from 'next/link';
import { darken, lighten } from 'polished';
import { FC, ReactNode } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const Item = styled.a<{ active: boolean; noHover: boolean }>`
  border-left: 4px solid transparent;
  border-color: ${({ active, theme }) =>
    active && darken(0.1, theme.colors.primary)};
  border-radius: 0;
  margin: 0;
  font-size: 13px;
  position: relative;
  height: 34px;
  display: flex;
  align-items: center;
  cursor: ${({ noHover }) => (noHover ? 'default' : 'cursor')};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  background: ${({ active, theme }) =>
    active && lighten(0.06, theme.colors.background)};

  :hover {
    background: ${({ theme, noHover }) =>
      noHover ? 'inherit' : lighten(0.06, theme.colors.background)};
  }

  svg {
    fill: ${({ theme, active }) =>
      active ? lighten(0.7, theme.colors.accent) : theme.colors.accent};
  }
`;

const ItemIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
`;

const ItemTitle = styled.div`
  display: flex;
  flex: 1;
`;

const ItemBadge = styled.div<{ active: boolean }>`
  padding: 0 20px;
  color: ${({ theme, active }) =>
    active ? lighten(0.2, theme.colors.accent) : theme.colors.accent};
`;

const SubItemMenuBox = styled.div``;

interface IProps {
  route: string;
  title: string;
  icon: ReactNode;
  equal?: boolean;
  showContentAlways?: boolean;
  noClick?: boolean;
  badge?: any;
  children?: React.ReactNode;
}

export const MenuItem: FC<IProps> = ({
  route,
  title,
  icon,
  children,
  equal,
  showContentAlways,
  noClick,
  badge,
}) => {
  const router = useRouter();

  const active = equal
    ? router.route === route
    : router.route.search(`${route}`) >= 0;

  if (noClick) {
    return (
      <>
        <Item active={active} noHover={noClick}>
          <ItemIcon>{icon}</ItemIcon>
          <ItemTitle>{title}</ItemTitle>
          {typeof badge !== 'undefined' && (
            <ItemBadge active={active}>{badge}</ItemBadge>
          )}
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
        <Item active={active} noHover={!!noClick}>
          <ItemIcon>{icon}</ItemIcon>
          <ItemTitle>{title}</ItemTitle>
          {typeof badge !== 'undefined' && (
            <ItemBadge active={active}>{badge}</ItemBadge>
          )}
        </Item>
      </Link>
      {(showContentAlways || active) && (
        <SubItemMenuBox>{children}</SubItemMenuBox>
      )}
    </>
  );
};
