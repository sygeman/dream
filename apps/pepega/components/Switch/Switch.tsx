import { darken } from 'polished';
import { FC } from 'react';
import styled from 'styled-components';

const height = 24;
const heightInner = 18;
const padding = (height - heightInner) / 2;

type Box = {
  active: boolean;
  activeColor?: string;
  inactiveColor?: string;
};

const Box = styled('div')<Box>`
  position: relative;
  cursor: pointer;
  display: flex;
  justify-content: ${({ active }) => (active ? 'flex-end' : 'flex-start')};
  height: ${height}px;
  width: ${height * 2}px;
  background: ${({ active, activeColor, inactiveColor }) =>
    active
      ? activeColor
      : inactiveColor || darken(0.2, activeColor || '#633EA4')};
  border-radius: ${height / 2}px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
`;

Box.defaultProps = {
  active: false,
  activeColor: '#633EA4',
  inactiveColor: undefined
};

interface ISlider {
  active: boolean;
}

const Slider = styled('div')<ISlider>`
  margin: ${padding}px;
  height: ${heightInner}px;
  width: ${heightInner}px;
  border-radius: ${heightInner / 2}px;
  background: ${({ active }) => (active ? '#eee' : darken(0.1, '#eee'))};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
`;

interface IProps {
  checked?: boolean;
  onChange?: () => void;
  activeColor?: string;
  inactiveColor?: string;
}

export const Switch: FC<IProps> = ({
  checked,
  onChange,
  activeColor,
  inactiveColor
}) => {
  return (
    <Box
      active={!!checked}
      activeColor={activeColor}
      inactiveColor={inactiveColor}
      onClick={() => onChange && onChange()}
    >
      <Slider active={!!checked} />
    </Box>
  );
};
