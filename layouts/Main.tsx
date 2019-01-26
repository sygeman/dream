import { inject, observer } from 'mobx-react';
import { RouterProps, withRouter } from 'next/router';
import { rgba } from 'polished';
import { Component } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import posed from 'react-pose';
import { YMInitializer } from 'react-yandex-metrika';
import styled from 'styled-components';
import TopNav from '../components/Nav/Top';
import PostView from '../components/PostHelper/View';
import { Access } from '../helpers/Access';
import { IStore } from '../lib/store';
import CategoriesProvider from '../providers/Categories';
import FollowsProvider from '../providers/Follows';
import PostProvider from '../providers/Post';
import { Icon } from '../ui/Icon';
import LeftMenu from '../ui/LeftMenu';
import { Modal } from '../ui/Modal';

const Box = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  background: ${({ theme }) =>
    'radial-gradient(' + theme.main1Color + ', ' + theme.dark2Color + ')'};
`;

const Content = styled.div`
  flex: 1;
  overflow: hidden;
  position: relative;
`;

const LeftAnim = posed.div({
  closed: { left: -260 },
  open: { left: 0 }
});

const Left = styled(LeftAnim)`
  background: ${({ theme }) => theme.dark2Color};
  width: 260px;
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  z-index: 100;
`;

const PostsBoxAnim = posed.div({
  noPaddingLeft: { 'padding-left': 0 },
  paddingLeft: { 'padding-left': '260px' }
});

const PostsBox = styled(PostsBoxAnim)`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ContentBox = styled('div')`
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

const Overlay = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => rgba(theme.dark2Color, 0.7)};
  z-index: 50;
`;

interface IProps {
  store?: IStore;
  router: RouterProps;
}

interface IState {
  smallWindow: boolean;
}

@inject('store')
@observer
class MainLayout extends Component<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      smallWindow: true
    };
  }

  public getCalcCountOnRow = () => {
    let width = window.innerWidth;

    if (width >= 1000) {
      width = width - 260;
    }

    const smallWindow = width < 1000;

    if (smallWindow !== this.state.smallWindow) {
      this.props.store.leftMenuTrigger(!smallWindow);

      this.setState({ smallWindow });
    }

    let countOnRow = Math.floor((width - 60) / 300);
    let gridWidth = countOnRow * 300 + 60;

    if (gridWidth < 360) {
      gridWidth = 360;
    }

    if (countOnRow < 1) {
      countOnRow = 1;
    }

    return {
      countOnRow,
      gridWidth
    };
  };

  public calcCountOnRow = () => {
    const { countOnRow, gridWidth } = this.getCalcCountOnRow();
    this.props.store.setGridData(countOnRow, gridWidth);
  };

  public componentDidMount() {
    this.calcCountOnRow();
    window.addEventListener('resize', this.calcCountOnRow);
  }

  public componentWillUnmount() {
    window.removeEventListener('resize', this.calcCountOnRow);
  }

  public render() {
    const { children, store, router } = this.props;

    let postId = null;

    if (typeof router.query.postId === 'string') {
      postId = router.query.postId;
    }

    return (
      <Box>
        <Modal minimal isOpen={!!postId} onClose={() => router.back()}>
          <div style={{ width: '1000px' }}>
            <PostProvider id={postId}>
              {({ post }) => <PostView {...post} />}
            </PostProvider>
          </div>
        </Modal>
        <ContentBox>
          <TopNav />
          <Content>
            <ContentInsideBox>
              <Left pose={store.leftMenuIsOpen ? 'open' : 'closed'}>
                <Scrollbars>
                  <LeftMenu>
                    <LeftMenu.Item
                      route="/"
                      equal
                      icon="home"
                      title="Главная"
                    />
                    <LeftMenu.Item route="/hot" icon="fire" title="В тренде" />
                    <LeftMenu.Item route="/new" icon="flare" title="Новое" />
                    <LeftMenu.Item route="/top" icon="trending-up" title="Топ">
                      <LeftMenu.SubItem route="/top/day">День</LeftMenu.SubItem>
                      <LeftMenu.SubItem route="/top/week">
                        Неделя
                      </LeftMenu.SubItem>
                      <LeftMenu.SubItem route="/top/month">
                        Месяц
                      </LeftMenu.SubItem>
                      <LeftMenu.SubItem route="/top/all">
                        Все время
                      </LeftMenu.SubItem>
                    </LeftMenu.Item>
                    <LeftMenu.Item
                      route="/categories"
                      icon="apps"
                      title="Категории"
                    >
                      <CategoriesProvider>
                        {({ categories }) =>
                          categories.map(({ game }) => (
                            <LeftMenu.SubItem
                              route={`/categories?game=${game.name}`}
                              active={router.query.game === game.name}
                              key={game._id}
                            >
                              {game.name}
                            </LeftMenu.SubItem>
                          ))
                        }
                      </CategoriesProvider>
                    </LeftMenu.Item>
                    <Access>
                      <LeftMenu.Item
                        route="/likes"
                        icon="thumb-up"
                        title="Понравившиеся"
                      />
                      <LeftMenu.Item
                        route="/follows"
                        icon="favorite"
                        title="Подписки"
                      >
                        <FollowsProvider>
                          {({ follows, moreFollows, hasMore }) => (
                            <>
                              {follows.map(channel => (
                                <LeftMenu.SubItem
                                  route={`/follows?channel=${channel.name}`}
                                  active={router.query.channel === channel.name}
                                  key={channel.name}
                                >
                                  {channel.title}
                                </LeftMenu.SubItem>
                              ))}
                              {hasMore && (
                                <LeftMenu.LoadMore
                                  onClick={() => moreFollows()}
                                >
                                  <Icon type="chevron-down" />
                                </LeftMenu.LoadMore>
                              )}
                            </>
                          )}
                        </FollowsProvider>
                      </LeftMenu.Item>
                    </Access>
                  </LeftMenu>
                </Scrollbars>
              </Left>
              <PostsBox
                id="layoutContent"
                pose={
                  store.leftMenuIsOpen && !this.state.smallWindow
                    ? 'paddingLeft'
                    : 'noPaddingLeft'
                }
              >
                <Scrollbars
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
            {this.state.smallWindow && store.leftMenuIsOpen && (
              <Overlay
                onClick={() => this.props.store.leftMenuTrigger(false)}
              />
            )}
          </Content>
        </ContentBox>
        <YMInitializer accounts={[51879323]} version="2" />
      </Box>
    );
  }
}

export default withRouter(MainLayout);
