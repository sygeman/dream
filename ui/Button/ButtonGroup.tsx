import styled from 'styled-components';
import { ButtonCommon } from './ButtonCommon';

export const ButtonGroup = styled.div`
  display: inline-flex;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  overflow: hidden;
  border-radius: 3px;

  ${ButtonCommon} {
    border-radius: 0;
  }
`;
