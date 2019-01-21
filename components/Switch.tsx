import { darken, lighten } from 'polished';
import { FC } from 'react';
import styled from '../theme';

const height = 24;
const heightInner = 18;
const padding = (height - heightInner) / 2;

const Box = styled('div')<{
  isActive: boolean;
  bgColor: string;
}>`
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
  background: #eee;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
`;

interface IProps {
  checked: boolean;
  onChange: () => void;
  bgColor?: string;
}

const Switch: FC<IProps> = ({ checked, onChange, bgColor }) => {
  const bgActive = bgColor ? lighten(0.1, bgColor) : '#633EA4';
  const bgNoActive = bgColor ? darken(0.1, bgColor) : '#1E1D21';
  const bgcColor = checked ? bgActive : bgNoActive;

  return (
    <Box isActive={checked} bgColor={bgcColor} onClick={() => onChange()}>
      <Slider />
    </Box>
  );
};

export default Switch;
