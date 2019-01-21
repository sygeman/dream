import { lighten } from 'polished';
import styled from 'styled-components';
import { ButtonCommon } from './ButtonCommon';

export const ButtonFlat = styled(ButtonCommon)`
  color: ${({ theme }) => theme.accent2Color};

  :focus {
    color: ${({ theme }) =>
      theme.accent2Color && lighten('0.2', theme.accent2Color)};
  }

  :hover {
    color: ${({ theme }) =>
      theme.accent2Color && lighten('0.2', theme.accent2Color)};
  }
`;
