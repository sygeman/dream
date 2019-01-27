import { lighten } from 'polished';
import styled from 'styled-components';
import { ButtonCommon } from './ButtonCommon';

interface IButton {
  mainColor?: string;
}

export const Button = styled(ButtonCommon)<IButton>`
  background: ${({ mainColor }) => mainColor};
  color: ${({ mainColor }) => lighten('0.45', mainColor)};

  :focus {
    background: ${({ mainColor }) => lighten('0.05', mainColor)};
  }

  :hover {
    background: ${({ mainColor }) => lighten('0.1', mainColor)};
  }
`;

Button.defaultProps = {
  mainColor: '#633FA4'
};
