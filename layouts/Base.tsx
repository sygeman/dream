import { inject, observer } from 'mobx-react';
import { RouterProps, withRouter } from 'next/router';
import { lighten, rgba } from 'polished';
import { Component, ReactNode } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { YMInitializer } from 'react-yandex-metrika';
import styled from 'styled-components';
import Auth from '../components/Auth';
import { BuyCoins } from '../components/BuyCoins';
import CreatePost from '../components/Post/CreatePost';
import TopNav from '../components/Nav/Top';
import PostView from '../components/Post/View';
import { IStore } from '../lib/store';
import PostProvider from '../providers/Post';
import { Modal } from '../ui/Modal';
import config from '../config';
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
  background: ${({ theme }) => lighten(0.03, theme.dark1Color)};
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
  router: RouterProps;
  fixedTopContent?: ReactNode;
  leftMenu?: ReactNode;
}

interface IState {
  leftMenuIsOpen: boolean;
}

@inject('store')
@observer
class BaseLayout extends Component<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      leftMenuIsOpen: false
    };
  }

  public render() {
    const { children, store, router, fixedTopContent, leftMenu } = this.props;

    let postId = null;

    if (typeof router.query.postId === 'string') {
      postId = router.query.postId;
    }

    let backPath = null;

    if (typeof router.query.backPath === 'string') {
      backPath = router.query.backPath;
    }

    return (
      <Box>
        <Modal
          visible={!!postId}
          minimal
          onClose={() => router.replace(backPath)}
        >
          <div style={{ width: '1000px' }}>
            <PostProvider id={postId}>
              {({ post }) => <PostView {...post} />}
            </PostProvider>
          </div>
        </Modal>
        <Modal
          title="Купить PepeCoin"
          visible={router.query.buyCoinsModal === '1'}
          onClose={() => router.back()}
        >
          <BuyCoins />
        </Modal>
        <Modal
          minimal
          visible={router.query.authModal === '1'}
          onClose={() => router.back()}
        >
          <Auth />
        </Modal>
        <Modal
          title="Новый пост"
          visible={router.query.newPost === '1'}
          onClose={() => router.back()}
        >
          <CreatePost />
        </Modal>

        <ContentBox>
          <TopNav
            leftMenuTrigger={() =>
              this.setState({ leftMenuIsOpen: !this.state.leftMenuIsOpen })
            }
          />
          <Content>
            <ContentInsideBox>
              <Left isOpen={this.state.leftMenuIsOpen}>
                <Scrollbars
                  autoHide
                  universal
                  renderView={props => <div {...props} id="mainScroll" />}
                >
                  {leftMenu}
                </Scrollbars>
              </Left>
              <PostsBox id="layoutContent">
                {fixedTopContent}
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
        <YMInitializer accounts={[config.yandexMetrikaId]} version="2" />
      </Box>
    );
  }
}

export default withRouter(BaseLayout);
