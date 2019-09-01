import { lighten } from 'polished';
import { FC } from 'react';
import styled from 'styled-components';
import { random } from 'lodash';

const SubItemSkeleton = styled('a')<{
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

  div {
    display: flex;
    background: ${({ theme }) => lighten(0.06, theme.dark1Color)};
    width: ${() => random(50, 100)}%;
    height: 13px;
    border-radius: 20px;
  }
`;

export const SubItemMenuSkeleton: FC = () => {
  return (
    <SubItemSkeleton>
      <div />
    </SubItemSkeleton>
  );
};
