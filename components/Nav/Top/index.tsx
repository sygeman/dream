import { inject, observer } from 'mobx-react';
import Link from 'next/link';
import { withRouter } from 'next/router';
import { darken, lighten } from 'polished';
import { Component } from 'react';
import styled from 'styled-components';
import { IStore } from '../../../lib/store';
import UserProvider from '../../../providers/User';
import WalletProvider from '../../../providers/Wallet';
import { Avatar } from '../../../ui/Avatar';
import { CoinIconGreen } from '../../../ui/CoinIcon';
import { Icon } from '../../../ui/Icon';
import { humanNumbers } from '../../../utils/count';
import Menu from './Menu';

const logo = 'https://ravepro.ams3.digitaloceanspaces.com/logo40.svg';
const discord = 'https://discord.gg/xVprhFC';

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

  @media (min-width: 700px) {
    display: none;
  }
`;

const PointsCount = styled.div`
  color: ${({ theme }) => lighten(0.4, theme.main1Color)};
  font-size: 12px;
  font-weight: 500;
  display: flex;
`;

const LogoLink = styled.a`
  display: flex;
  align-items: center;
  height: 100%;
`;

const LogoImg = styled.img`
  height: 28px;
  margin: 0 10px;
  padding: 5px;
  cursor: pointer;
  background: ${({ theme }) => lighten(0.05, theme.main1Color)};
  border-radius: 5px;

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

const UserDataBox = styled.div`
  padding: 0 5px;
  display: flex;
  cursor: pointer;
  align-items: center;
  height: 100%;
`;

const AvatarBox = styled.div`
  padding-left: 14px;
`;

const PointsBox = styled.div`
  display: flex;
  margin: 0 10px;
`;

const Points = styled.div`
  display: flex;
  align-items: center;
  margin: 0 5px;
  font-size: 13px;
  background: ${({ theme }) => theme.dark2Color};
  padding: 0 10px;
  border-radius: 5px;
  height: 32px;

  @media (max-width: 700px) {
    display: none;
  }
`;

const BuyCoinsLink = styled.a`
  margin-left: 10px;
  color: ${({ theme }) => lighten(0.3, theme.main1Color)};
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  cursor: pointer;

  i {
    font-size: 15px;
  }
`;

const UserNameBox = styled.div`
  display: flex;
  align-items: center;
  font-size: 13px;
  color: ${({ theme }) => lighten(0.4, theme.main1Color)};

  @media (max-width: 700px) {
    display: none;
  }
`;

const UserCaratBox = styled.div`
  height: 100%;
  padding: 0 6px;
  display: flex;
  align-items: center;
  font-size: 17px;
`;

interface IProps {
  store?: IStore;
  router: any;
  leftMenuTrigger: () => void;
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
        <Left>
          <MenuButton onClick={() => this.props.leftMenuTrigger()}>
            <Icon type="menu" />
          </MenuButton>
          <Link href="/" passHref>
            <LogoLink>
              <LogoImg src={logo} />
            </LogoLink>
          </Link>
          <LeftMenu>
            <Links>
              <Link href="/" passHref>
                <TopLink>Клипы</TopLink>
              </Link>
              <TopLink href={discord} target="_blank">
                Discord
              </TopLink>
            </Links>
          </LeftMenu>
        </Left>
        <Right>
          <UserBox>
            <UserProvider>
              {({ user }) =>
                user ? (
                  <>
                    <Links>
                      <Link
                        as={`/newPost`}
                        href={{
                          pathname: this.props.router.route,
                          query: {
                            ...this.props.router.query,
                            newPost: 1
                          }
                        }}
                        passHref
                      >
                        <TopLink>Закинуть клип</TopLink>
                      </Link>
                    </Links>
                    <PointsBox>
                      {/* <Points>
                        <CoinIconGold />
                        <PointsCount>
                          <WalletProvider where={{ currency: 'coin' }}>
                            {({ data }) =>
                              humanNumbers(data ? data.balance : 0)
                            }
                          </WalletProvider>
                        </PointsCount>
                      </Points> */}
                      <Points>
                        <CoinIconGreen />
                        <PointsCount>
                          <WalletProvider where={{ currency: 'real' }}>
                            {({ data }) =>
                              humanNumbers(data ? data.balance : 0)
                            }
                          </WalletProvider>
                          <Link
                            as={`/buycoins`}
                            href={{
                              pathname: this.props.router.route,
                              query: {
                                ...this.props.router.query,
                                buyCoinsModal: 1
                              }
                            }}
                            passHref
                          >
                            <BuyCoinsLink>
                              <Icon type="plus-circle" />
                            </BuyCoinsLink>
                          </Link>
                        </PointsCount>
                      </Points>
                    </PointsBox>
                    <Menu user={user}>
                      <UserDataBox>
                        <UserNameBox>{user.mainProfile.name}</UserNameBox>
                        <AvatarBox>
                          <Avatar avatar={user.mainProfile.avatar} />
                        </AvatarBox>
                        <UserCaratBox>
                          <Icon type="caret-down" />
                        </UserCaratBox>
                      </UserDataBox>
                    </Menu>
                  </>
                ) : (
                  <Links>
                    <Link
                      as={`/auth?continue=/newPost`}
                      href={{
                        pathname: this.props.router.route,
                        query: {
                          ...this.props.router.query,
                          authModal: 1
                        }
                      }}
                      passHref
                    >
                      <TopLink>Закинуть клип</TopLink>
                    </Link>
                    <Link
                      as={`/auth?continue=${this.props.router.asPath}`}
                      href={{
                        pathname: this.props.router.route,
                        query: {
                          ...this.props.router.query,
                          authModal: 1
                        }
                      }}
                      passHref
                    >
                      <TopLink>Войти</TopLink>
                    </Link>
                  </Links>
                )
              }
            </UserProvider>
          </UserBox>
        </Right>
      </Box>
    );
  }
}

export default withRouter(TopNav);
