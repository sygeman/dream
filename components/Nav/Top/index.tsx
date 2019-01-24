import { inject, observer } from 'mobx-react';
import Link from 'next/link';
import { lighten, rgba } from 'polished';
import { Component } from 'react';
import styled from 'styled-components';
import { IStore } from '../../../lib/store';
import UserProvider from '../../../providers/User';
import GuestBlock from './GuestBlock';
import UserBlock from './UserBlock';

const Box = styled.div`
  height: 50px;
  display: flex;
  z-index: 100;
  border-bottom: 1px solid ${({ theme }) => rgba(theme.main1Color, 0.5)};
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

const Links = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  height: 100%;

  @media (max-width: 700px) {
    display: none;
  }
`;

const Right = styled.div`
  display: flex;
  align-items: center;
`;

const LogoImg = styled.img`
  height: 26px;
  padding: 0 20px;
  cursor: pointer;
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
  font-size: 14px;
  display: flex;
  height: 100%;
  align-items: center;
  cursor: pointer;
  height: 100%;

  :hover {
    color: ${({ theme }) => lighten(0.6, theme.main1Color)};
  }
`;

interface IProps {
  store?: IStore;
}

interface IState {
  topPx: number;
}

@inject('store')
@observer
class TopNav extends Component<IProps, IState> {
  public render() {
    return (
      <Box shadow={!this.props.store.layoutScrollIsTop}>
        <Left>
          <Link href="/" passHref>
            <a>
              <LogoImg src="https://cdn.frankerfacez.com/emoticon/243789/2" />
            </a>
          </Link>
          <Links>
            <Link href="/" passHref>
              <TopLink>Клипы</TopLink>
            </Link>
            <Link href="/casino" passHref>
              <TopLink>Игры</TopLink>
            </Link>
            <TopLink href="https://discord.gg/xVprhFC" target="_blank">
              Discord
            </TopLink>
          </Links>
        </Left>
        <Right>
          <UserBox>
            <UserProvider>
              {({ user }) =>
                user ? <UserBlock user={user} /> : <GuestBlock />
              }
            </UserProvider>
          </UserBox>
        </Right>
      </Box>
    );
  }
}

export default TopNav;
