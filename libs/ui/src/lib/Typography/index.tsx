import React from 'react';
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

type Props = TypographyProps &
  SpaceProps &
  BorderProps &
  ColorProps &
  ShadowProps &
  PositionProps &
  LayoutProps &
  FlexboxProps & { style?: React.CSSProperties | undefined };

export const Typography = styled.span<Props>(
  {
    boxSizing: 'border-box',
    fontSize: '12.5px',
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

Typography.defaultProps = {
  fontFamily: 'body',
  color: 'text1',
};
