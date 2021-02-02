import { Flex } from '../base/Flex';
import styled from 'styled-components';

export const Menu = styled(Flex)`
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.accent1};
  border-radius: 4px;
`;

export const MenuItem = styled(Flex)`
  align-items: center;
  padding: 0 12px;
  height: 32px;
`;
