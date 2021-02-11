import { lighten } from 'polished';
import styled from 'styled-components';
import { ButtonCommon } from './ButtonCommon';

export const ButtonFlat = styled(ButtonCommon)`
  color: ${({ theme }) => theme.colors.accent};

  :focus {
    color: ${({ theme }) =>
      theme.colors.accent && lighten('0.2', theme.colors.accent)};
  }

  :hover {
    color: ${({ theme }) =>
      theme.colors.accent && lighten('0.2', theme.colors.accent)};
  }
`;
