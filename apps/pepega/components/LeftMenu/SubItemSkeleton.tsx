import { lighten } from 'polished';
import styled from 'styled-components';

const SubItemSkeleton = styled('a')<{
  width: number;
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
    background: ${({ theme }) => lighten(0.06, theme.colors.background)};
    width: ${({ width }) => width}%;
    height: 13px;
    border-radius: 20px;
  }
`;

export const SubItemMenuSkeleton = ({ width }) => {
  return (
    <SubItemSkeleton width={width}>
      <div />
    </SubItemSkeleton>
  );
};
