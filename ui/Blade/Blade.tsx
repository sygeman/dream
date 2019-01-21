import { lighten } from 'polished';
import { FC } from 'react';
import styled from 'styled-components';

const Box = styled.div`
  display: flex;
  height: 100%;
`;

const LeftBG = styled.div`
  display: flex;
  height: 100%;
  width: 50%;
  background: ${({ theme }) => theme.dark1Color};
`;

const RightBG = styled.div`
  display: flex;
  height: 100%;
  width: 50%;
  background: ${({ theme }) => theme.dark2Color};
`;

const ContainerBox = styled.div`
  position: absolute;
  display: flex;
  height: 100%;
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  position: relative;
  height: 100%;
  min-width: 1000px;
  margin: 0 auto;
  background: ${({ theme }) => theme.dark2Color};
`;

const Close = styled.div`
  position: absolute;
  top: 40px;
  right: -60px;
  background: none;
  border: none;
  margin-left: auto;
  height: 36px;
  width: 60px;
  font-size: 22px;
  color: ${({ theme }) => theme.accent2Color};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.12s ease-in, color 0.12s ease-in,
    box-shadow 0.12s ease-in;

  :hover {
    color: ${({ theme }) => lighten(0.4, theme.accent2Color)};
  }
`;

const CloseIcon = styled.i`
  background: ${({ theme }) => theme.dark1Color};
  height: 36px;
  width: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
`;

export const Left = styled.div`
  padding-top: 40px;
  background: ${({ theme }) => theme.dark1Color};
  width: 226px;
`;

export const Right = styled.div`
  flex: 1;
  padding-top: 40px;
`;

interface ITab {
  active?: boolean;
}

export const Tab = styled('div')<ITab>`
  font-size: 13px;
  padding: 10px;
  margin: 2px 10px;
  font-weight: 500;
  border-radius: 3px;
  cursor: pointer;
  color: ${({ theme }) => lighten(0.2, theme.accent2Color)};
  background: ${({ active, theme }) =>
    active ? lighten(0.1, theme.dark1Color) : 'none'};
  transition: background 0.12s ease-in, color 0.12s ease-in,
    box-shadow 0.12s ease-in;

  :hover {
    background: ${({ theme, active }) =>
      active
        ? lighten(0.1, theme.dark1Color)
        : lighten(0.05, theme.dark1Color)};
  }
`;

export const MenuTitle = styled.div`
  color: ${({ theme }) => theme.accent2Color};
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 500;
  padding: 5px;
  margin: 2px 10px;
`;

export const Divider = styled.div`
  margin: 10px;
  border-top: 1px solid ${({ theme }) => lighten(0.1, theme.dark1Color)};
`;

export const TabContent = styled.div`
  padding: 0 40px;
`;

export const TabContentTitle = styled.div`
  font-size: 16px;
  color: #eee;
  padding: 5px 0;
  margin-bottom: 16px;
`;

interface IProps {
  onClose: () => void;
}

export const Screen: FC<IProps> = ({ children, onClose }) => (
  <Box>
    <LeftBG />
    <RightBG />
    <ContainerBox>
      <Container>
        {children}
        <Close onClick={onClose}>
          <CloseIcon className="zmdi zmdi-close" />
        </Close>
      </Container>
    </ContainerBox>
  </Box>
);
