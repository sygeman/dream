import { lighten } from 'polished';
import styled from 'styled-components';
export { MenuItem as Item } from './Item';
export { SubItemMenu as SubItem } from './SubItem';

export const Box = styled.div`
  padding: 10px 0;
`;

export const LoadMore = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  font-size: 13px;
  color: ${({ theme }) => theme.accent2Color};
  background: ${({ theme }) => lighten(0.03, theme.dark2Color)};
  cursor: pointer;

  :hover {
    background: ${({ theme }) => lighten(0.05, theme.dark2Color)};
  }

  i {
    font-size: 18px;
  }
`;
