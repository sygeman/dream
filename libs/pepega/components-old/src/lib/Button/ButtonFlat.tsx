import { lighten } from 'polished';
import styled from 'styled-components';
import { ButtonCommon } from './ButtonCommon';

export const ButtonFlat = styled(ButtonCommon)`
  color: ${({ theme }) => '#968A9D'};

  :focus {
    color: ${({ theme }) => '#968A9D' && lighten('0.2', '#968A9D')};
  }

  :hover {
    color: ${({ theme }) => '#968A9D' && lighten('0.2', '#968A9D')};
  }
`;
