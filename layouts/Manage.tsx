import { inject, observer } from 'mobx-react';
import { lighten, rgba } from 'polished';
import { Component, ReactNode } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import styled from 'styled-components';
import TopNav from '../components/Nav/Top';
import { Access } from '../helpers/Access';
import { IStore } from '../lib/store';
import * as LeftMenu from '../ui/LeftMenu';

const LEFT_MENU_WIDTH = 260;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  background: ${({ theme }) => theme.dark1Color};
`;

const Content = styled.div`
  flex: 1;
  overflow: hidden;
  position: relative;
`;

const Left = styled.div<{ isOpen: boolean }>`
  background: ${({ theme }) => lighten(0.05, theme.dark1Color)};
  width: ${LEFT_MENU_WIDTH}px;
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  z-index: 100;
  transition: 0.3s;

  @media (max-width: 700px) {
    left: ${({ isOpen }) => (isOpen ? 0 : -LEFT_MENU_WIDTH)}px;
  }
`;

const PostsBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-left: 0;
  transition: 0.3s;

  @media (min-width: 700px) {
    padding-left: ${LEFT_MENU_WIDTH}px;
  }
`;

const ContentBox = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
`;

const ContentInsideBox = styled.div`
  height: 100%;
  display: flex;
`;

const Overlay = styled.div<{ leftMenuIsOpen: boolean }>`
  display: none;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => rgba(theme.dark1Color, 0.95)};
  z-index: 50;

  @media (max-width: 700px) {
    ${({ leftMenuIsOpen }) => leftMenuIsOpen && 'display: block;'}
  }
`;

interface IProps {
  store?: IStore;
  fixedTopContent?: ReactNode;
}

interface IState {
  leftMenuIsOpen: boolean;
}

@inject('store')
@observer
class ManageLayout extends Component<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      leftMenuIsOpen: false
    };
  }

  public render() {
    const { children, store } = this.props;

    return (
      <Access allow={currentUser => currentUser.role === 'admin'}>
        <Box>
          <ContentBox>
            <TopNav
              leftMenuTrigger={() =>
                this.setState({ leftMenuIsOpen: !this.state.leftMenuIsOpen })
              }
            />
            <Content>
              <ContentInsideBox>
                <Left isOpen={this.state.leftMenuIsOpen}>
                  <Scrollbars autoHide universal>
                    <LeftMenu.Box>
                      <LeftMenu.Item
                        route="/manage"
                        equal
                        icon="chart"
                        title="Dashboard"
                      />
                      <LeftMenu.Item
                        route="/manage/tags"
                        icon="tag"
                        title="Теги"
                      />
                      <LeftMenu.Item
                        route="/manage/streams"
                        icon="twitch"
                        title="Стримы"
                      />
                      <LeftMenu.Item
                        route="/manage/posts"
                        icon="collection-video"
                        title="Клипы"
                      />
                    </LeftMenu.Box>
                  </Scrollbars>
                </Left>
                <PostsBox id="layoutContent">
                  <Scrollbars
                    autoHide
                    universal
                    onScrollFrame={e => {
                      const offset =
                        e.scrollHeight - e.scrollTop - e.clientHeight;
                      store.setLayoutInLoadArea(offset <= 250);
                    }}
                  >
                    {children}
                  </Scrollbars>
                </PostsBox>
              </ContentInsideBox>
              <Overlay
                leftMenuIsOpen={this.state.leftMenuIsOpen}
                onClick={() => this.setState({ leftMenuIsOpen: false })}
              />
            </Content>
          </ContentBox>
        </Box>
      </Access>
    );
  }
}

export default ManageLayout;
