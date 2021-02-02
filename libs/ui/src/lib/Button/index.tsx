import * as React from 'react';
import { lighten } from 'polished';
import styled from 'styled-components';
import { Box } from '../base';

type ButtonProps = {
  mainColor?: string;
  isFirst?: boolean;
  isLast?: boolean;
  isGroup?: boolean;
};

const getBorderRadius = (
  { isFirst, isGroup, isLast }: ButtonProps,
  size: string
) => {
  if (!isGroup) return size;
  const isIn = isGroup && !isFirst && !isLast;
  if (isIn) return '0px';
  if (isFirst) return `${size} 0 0 ${size}`;
  if (isLast) return `0 ${size} ${size} 0`;
  return size;
};

export const Button = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 14px;
  height: 32px;
  font-size: 12.5px;
  background: ${({ mainColor, theme }) => theme.colors[mainColor || 'accent1']};
  border-radius: ${(props) => getBorderRadius(props, '3px')};
  cursor: pointer;
  color: ${({ mainColor, theme }) =>
    lighten(1.5, theme.colors[mainColor || 'accent1'])};
  border: none;
  ${({ isGroup, isLast }) =>
    (isGroup || !isLast) && `margin-right: 1px;`} outline: none;
  transition: background 0.12s ease-in, color 0.12s ease-in,
    box-shadow 0.12s ease-in;
  i {
    font-size: 15px;
  }
  :focus {
    background: ${({ mainColor, theme }) =>
      lighten(0.1, theme.colors[mainColor || 'accent1'])};
  }
  :hover {
    background: ${({ mainColor, theme }) =>
      lighten(0.2, theme.colors[mainColor || 'accent1'])};
  }
`;

export const ButtonGroup = ({ children }) => (
  <Box display="inline-flex">
    {React.Children.map(children, (child, index) =>
      React.cloneElement(child, {
        isGroup: true,
        isFirst: index === 0,
        isLast: index + 1 === React.Children.count(children),
      })
    )}
  </Box>
);
