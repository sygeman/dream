import { lighten } from 'polished';
import styled from 'styled-components';
import { ButtonCommon } from './ButtonCommon';

interface IButton {
  mainColor?: string;
}

export const Button = styled(ButtonCommon)<IButton>`
  background: ${({ mainColor }) => mainColor};
  color: ${({ mainColor }) => lighten('0.45', mainColor || '#633FA4')};

  :focus {
    background: ${({ mainColor }) => lighten('0.05', mainColor || '#633FA4')};
  }

  :hover {
    background: ${({ mainColor }) => lighten('0.1', mainColor || '#633FA4')};
  }
`;

Button.defaultProps = {
  mainColor: '#633FA4'
};
