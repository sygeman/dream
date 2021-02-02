import * as React from 'react';
import { lighten, darken } from 'polished';
import styled from 'styled-components';
import ravepro from '../theme/ravepro';

const height = 24;
const heightInner = 18;
const padding = (height - heightInner) / 2;

const Box = styled.div<{ isActive: boolean; bgColor: string }>`
  position: relative;
  cursor: pointer;
  display: flex;
  justify-content: ${({ isActive }) => (isActive ? 'flex-end' : 'flex-start')};
  height: ${height}px;
  width: ${height * 2}px;
  background: ${({ bgColor }) => bgColor};
  border-radius: ${height / 2}px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
`;

const Slider = styled.div`
  margin: ${padding}px;
  height: ${heightInner}px;
  width: ${heightInner}px;
  border-radius: ${heightInner / 2}px;
  background: ${({ theme }) => theme.colors.text1};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
`;

export const Switch = ({
  checked = false,
  onChange = (checked) => null,
  bgcolor = '',
}) => {
  const bgActive = bgcolor ? lighten(0.2, bgcolor) : ravepro.colors.green;
  const bgNoActive = bgcolor ? darken(0.2, bgcolor) : ravepro.colors.dark1;
  const bgColor = checked ? bgActive : bgNoActive;

  return (
    <Box
      isActive={checked}
      bgColor={bgColor}
      onClick={() => onChange(!checked)}
    >
      <Slider />
    </Box>
  );
};
