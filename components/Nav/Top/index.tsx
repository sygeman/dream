import { inject, observer } from 'mobx-react';
import { withRouter } from 'next/router';
import Link from 'next/link';
import { lighten, darken } from 'polished';
import { Component } from 'react';
import styled from 'styled-components';
import { IStore } from '../../../lib/store';
import UserProvider from '../../../providers/User';
import { Icon } from '../../../ui/Icon';
import { Modal } from '../../../ui/Modal';
import UserBlock from './UserBlock';
import Auth from '../../Auth';

const Box = styled.div`
  height: 50px;
  display: flex;
  z-index: 100;
  padding: 0 10px;
  background: ${({ theme }) => darken(0.1, theme.main1Color)};
`;

const Left = styled.div`
  display: flex;
  align-items: center;
`;

const LeftMenu = styled.div`
  height: 100%;

  @media (max-width: 700px) {
    display: none;
  }
`;

const Links = styled.div`
  padding: 0 5px;
  display: flex;
  align-items: center;
  flex: 1;
  height: 100%;
  font-size: 13px;
`;

const Right = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-end;
`;

const MenuButton = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 20px;
  font-size: 20px;
  color: ${({ theme }) => lighten(0.3, theme.main1Color)};
  cursor: pointer;
`;

const LogoImg = styled.img`
  height: 24px;
  padding: 0 10px;
  cursor: pointer;

  @media (max-width: 700px) {
    display: none;
  }
`;

const UserBox = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 10px;
`;

const TopLink = styled.a`
  padding: 0 10px;
  color: ${({ theme }) => lighten(0.3, theme.main1Color)};
  font-size: 12px;
  display: flex;
  height: 100%;
  align-items: center;
  cursor: pointer;
  height: 100%;
  text-transform: uppercase;

  :hover {
    color: ${({ theme }) => lighten(0.6, theme.main1Color)};
  }
`;

interface IProps {
  store?: IStore;
  router: any;
}

@inject('store')
@observer
class TopNav extends Component<IProps> {
  constructor(props) {
    super(props);
  }

  public render() {
    return (
      <Box>
        <Modal
          minimal
          isOpen={this.props.router.query.authModal === '1'}
          onClose={() => this.props.router.back()}
        >
          <Auth />
        </Modal>
        <Left>
          <MenuButton onClick={() => this.props.store.leftMenuTrigger()}>
            <Icon type="menu" />
          </MenuButton>
          <Link href="/" passHref>
            <a>
              <LogoImg src="https://cdn.frankerfacez.com/emoticon/243789/2" />
            </a>
          </Link>
          <LeftMenu>
          <Links>
            <Link href="/" passHref>
              <TopLink>Клипы</TopLink>
            </Link>
            <Link href="/casino" passHref>
              <TopLink>Рулетка</TopLink>
            </Link>
            <TopLink href="https://discord.gg/xVprhFC" target="_blank">
              Discord
            </TopLink>
          </Links>
          </LeftMenu>
        </Left>
        <Right>
          <UserBox>
            <UserProvider>
              {({ user }) =>
                user ? <UserBlock user={user} /> : <Links>
                  <Link as={`/auth?continue=/newPost`} href="/?authModal=1" passHref>
                    <TopLink>Закинуть клип</TopLink>
                  </Link>
                  <Link as={`/auth?continue=${this.props.router.asPath}`} href="/?authModal=1" passHref>
                    <TopLink>Войти</TopLink>
                  </Link>
                </Links>
              }
            </UserProvider>
          </UserBox>
        </Right>
      </Box>
    );
  }
}

export default withRouter(TopNav);
