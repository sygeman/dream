import { rgba } from 'polished';
import { FC } from 'react';
import styled from '../theme';

const Box = styled.div`
  position: fixed;
  z-index: 1000;
  justify-content: center;
  width: 100%;
  top: 0;
  left: 0;
  height: 100%;
  background: ${({ theme }) => rgba(theme.dark2Color, 0.9)};
`;

interface IProps {
  isOpen: boolean;
}

const ModalFull: FC<IProps> = ({ children, isOpen }) => {
  if (!isOpen) {
    return null;
  }

  return <Box>{children}</Box>;
};

export default ModalFull;
