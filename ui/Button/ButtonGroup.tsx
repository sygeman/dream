import styled from 'styled-components';
import { ButtonCommon } from './ButtonCommon';

export const ButtonGroup = styled.div`
  display: inline-flex;
  overflow: hidden;
  border-radius: 3px;

  ${ButtonCommon} {
    border-radius: 0;
    box-shadow: none;
  }
`;
