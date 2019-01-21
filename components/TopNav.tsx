import Router from 'next/router';
import { lighten } from 'polished';
import { Component } from 'react';
import styled from '../theme';
import Access from './Access';

import TopUserBlock from './TopUserBlock';

const Box = styled.div`
  height: 50px;
  display: flex;
  z-index: 100;
  ${({ shadow }) =>
    shadow &&
    'box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);'}
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

const LogoLink = styled.a``;

interface IState {
  topPx: number;
}

class TopNav extends Component<{}, IState> {
  constructor(props) {
    super(props);

    this.state = {
      topPx: 0
    };
  }

  public scrollHandler() {
    const scrollTop = document.getElementById('layoutContent').scrollTop;

    if (!this.state) {
      return;
    }

    if (this.state.topPx !== scrollTop) {
      this.setState({ topPx: scrollTop });
    }
  }

  public componentDidMount() {
    document
      .getElementById('layoutContent')
      .addEventListener('scroll', this.scrollHandler);
  }

  public componentWillUnmount() {
    document
      .getElementById('layoutContent')
      .removeEventListener('scroll', this.scrollHandler);
  }

  public render() {
    return (
      <Box shadow={this.state.topPx !== 0}>
        <Left>
          <LogoLink
            href="/"
            onClick={e => {
              e.preventDefault();
              Router.push('/');
            }}
          >
            <LogoImg src="https://cdn.frankerfacez.com/emoticon/243789/2" />
          </LogoLink>
          <Links>
            <TopLink onClick={() => Router.push('/')}>Home</TopLink>
            <Access allow={currentUser => currentUser.role === 'admin'}>
              <TopLink onClick={() => Router.push('/twitchFollowsClips')}>
                Following Clips
              </TopLink>
            </Access>
            <TopLink onClick={() => Router.push('/casino')}>NeCasino</TopLink>
          </Links>
        </Left>
        <Right>
          <UserBox>
            <TopUserBlock />
          </UserBox>
        </Right>
      </Box>
    );
  }
}

export default TopNav;
