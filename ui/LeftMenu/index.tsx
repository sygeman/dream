import { lighten } from 'polished';
import { Component } from 'react';
import styled from 'styled-components';
import Item from './Item';
import SubItem from './SubItem';

const Box = styled.div`
  padding: 10px 0;
`;

const LoadMore = styled.div`
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

export default class LeftMenu extends Component {
  public static Item = Item;
  public static SubItem = SubItem;
  public static LoadMore = LoadMore;

  public render() {
    return <Box>{this.props.children}</Box>;
  }
}
