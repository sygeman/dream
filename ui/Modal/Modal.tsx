import { lighten, rgba } from 'polished';
import * as React from 'react';
import styled from 'styled-components';
import { Icon } from '../Icon';
import { Portal } from '../Portal';

const BG = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  top: 0;
  left: 0;
  overflow: auto;
  z-index: 1000;
`;

const BGOut = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background: ${({ theme }) => theme.dark2Color};
  opacity: 0.7;
  z-index: 3000;
`;

const BoxW = styled.div`
  z-index: 3500;
  margin: auto;
  padding: 60px 0;
  display: flex;
`;

const BoxNav = styled.div`
  cursor: pointer;
  flex: 1;
  display: flex;
  align-items: center;
  min-width: 60px;
  justify-content: center;
  color: ${({ theme }) => theme.accent2Color && rgba(theme.accent2Color, 0.5)};

  i {
    font-size: 40px;
  }

  :hover {
    color: ${({ theme }) => theme.accent2Color};
  }
`;

const Box = styled('div')<{
  minimal: boolean;
}>`
  min-width: 240px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  margin: auto;
  padding: ${({ minimal }) => (minimal ? '0' : '20px')};
  z-index: 3500;
  display: flex;
  position: relative;
`;

const ModalB = styled.div`
  background: ${({ theme }) =>
    theme.dark2Color && lighten(0.01, theme.dark2Color)};
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  background: ${({ theme }) => theme.main1Color};
  border-radius: 4px 4px 0 0;
`;

const Title = styled.div`
  padding: 0 20px;
  font-size: 15px;
  color: ${({ theme }) => theme.text1Color};
`;

const Close = styled.div`
  background: none;
  border: none;
  margin-left: auto;
  padding: 0 20px;
  font-size: 22px;
  color: ${({ theme }) => theme.text1Color};
  cursor: pointer;

  :hover {
    color: ${({ theme }) => theme.text1Color};
  }
`;

const CloseOut = styled.div`
  display: flex;
  position: absolute;
  right: 0;
  background: none;
  border: none;
  margin-left: auto;
  width: 60px;
  justify-content: center;
  font-size: 34px;
  color: ${({ theme }) => theme.accent2Color && rgba(theme.accent2Color, 0.5)};
  cursor: pointer;

  :hover {
    color: ${({ theme }) => theme.accent2Color};
  }
`;

const Content = styled('div')<{
  minimal: boolean;
}>`
  padding: ${({ minimal }) => (minimal ? '0' : '15px')};
  display: flex;
`;

interface IProps {
  onClose: () => void;
  onLeftClick?: () => void;
  onRightClick?: () => void;
  title: string;
  isOpen: boolean;
  minimal?: boolean;
}

export class Modal extends React.Component<IProps> {
  public static defaultProps: IProps = {
    minimal: false,
    isOpen: false,
    title: '',
    onClose: () => undefined
  };

  public componentDidMount() {
    window.addEventListener(
      'keydown',
      e => {
        if (e.keyCode === 27) {
          this.props.onClose();
        }
      },
      false
    );
  }

  public render() {
    const {
      isOpen,
      children,
      title,
      onClose,
      onLeftClick,
      onRightClick,
      minimal
    } = this.props;

    if (!isOpen) {
      return null;
    }

    return (
      <Portal selector="root-modal">
        <BG>
          <BGOut onClick={() => onClose()} />
          <BoxW>
            <Box minimal={minimal}>
              {minimal && (
                <BoxNav
                  onClick={() => (onLeftClick ? onLeftClick() : onClose())}
                >
                  {onLeftClick && <Icon type="chevron-left" />}
                </BoxNav>
              )}
              <ModalB>
                {!minimal && (
                  <Header>
                    <Title>{title}</Title>
                    <Close onClick={() => onClose()}>
                      <i className="zmdi zmdi-close" />
                    </Close>
                  </Header>
                )}
                <Content minimal={minimal}>{children}</Content>
              </ModalB>
              {minimal && (
                <CloseOut onClick={() => onClose()}>
                  <i className="zmdi zmdi-close" />
                </CloseOut>
              )}
              {minimal && (
                <BoxNav
                  onClick={() => (onRightClick ? onRightClick() : onClose())}
                >
                  {onRightClick && <Icon type="chevron-right" />}
                </BoxNav>
              )}
            </Box>
          </BoxW>
        </BG>
      </Portal>
    );
  }
}
