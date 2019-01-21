import { rgba } from 'polished';
import { FC } from 'react';
import styled from 'styled-components';
import { Portal } from '../Portal';

const Box = styled.div`
  position: fixed;
  z-index: 1000;
  justify-content: center;
  width: 100%;
  top: 0;
  left: 0;
  height: 100%;
  background: ${({ theme }) => theme.dark2Color && rgba(theme.dark2Color, 0.9)};
`;

interface IProps {
  isOpen: boolean;
}

export const ModalFull: FC<IProps> = ({ children, isOpen }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <Portal selector="root-modal-full">
      <Box>{children}</Box>
    </Portal>
  );
};
