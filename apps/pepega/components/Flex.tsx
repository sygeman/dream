import styled from 'styled-components';
import {
  space,
  SpaceProps,
  color,
  ColorProps,
  layout,
  LayoutProps,
  flexbox,
  FlexboxProps,
  border,
  BorderProps,
  typography,
  TypographyProps
} from 'styled-system';

export const Flex = styled.div<
  SpaceProps &
    ColorProps &
    LayoutProps &
    FlexboxProps &
    BorderProps &
    TypographyProps
>(
  {
    display: 'flex'
  },
  space,
  color,
  layout,
  flexbox,
  border,
  typography
);
