import {
  typography,
  TypographyProps,
  space,
  SpaceProps,
  border,
  BorderProps,
  color,
  ColorProps,
  shadow,
  ShadowProps,
  position,
  PositionProps,
  layout,
  LayoutProps,
  flexbox,
  FlexboxProps,
} from 'styled-system';
import styled from 'styled-components';

type BoxProps = TypographyProps &
  SpaceProps &
  BorderProps &
  ColorProps &
  ShadowProps &
  PositionProps &
  LayoutProps &
  FlexboxProps & { style?: React.CSSProperties | undefined };

export const Box = styled.div<BoxProps>(
  {
    boxSizing: 'border-box',
  },
  typography,
  space,
  border,
  color,
  shadow,
  position,
  layout,
  flexbox
);
