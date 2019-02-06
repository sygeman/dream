import gql from 'graphql-tag';
import { inject, observer } from 'mobx-react';
import { RouterProps, withRouter } from 'next/router';
import { lighten, rgba } from 'polished';
import { Component, ReactNode } from 'react';
import { Query } from 'react-apollo';
import Scrollbars from 'react-custom-scrollbars';
import posed from 'react-pose';
import { YMInitializer } from 'react-yandex-metrika';
import styled from 'styled-components';
import TopNav from '../components/Nav/Top';
import PostView from '../components/PostHelper/View';
import { Access } from '../helpers/Access';
import { Modal } from '../helpers/Modal';
import { IStore } from '../lib/store';
import CategoriesProvider from '../providers/Categories';
import FollowsProvider from '../providers/Follows';
import PostProvider from '../providers/Post';
import { Icon } from '../ui/Icon';
import * as LeftMenu from '../ui/LeftMenu';

const GET_POST_AROUND = gql`
  query postAround(
    $id: ID!
    $authorId: ID
    $tagId: ID
    $likedUserId: ID
    $sort: SortType
  ) {
    postAround(
      id: $id
      authorId: $authorId
      tagId: $tagId
      likedUserId: $likedUserId
      sort: $sort
    ) {
      prevId
      nextId
    }
  }
`;

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

const LeftAnim = posed.div({
  closed: { left: -LEFT_MENU_WIDTH },
  open: { left: 0 }
});

const Left = styled(LeftAnim)`
  background: ${({ theme }) => lighten(0.05, theme.dark1Color)};
  width: ${LEFT_MENU_WIDTH}px;
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  z-index: 100;
`;

const PostsBoxAnim = posed.div({
  noPaddingLeft: { 'padding-left': 0 },
  paddingLeft: { 'padding-left': LEFT_MENU_WIDTH + 'px' }
});

const PostsBox = styled(PostsBoxAnim)`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-left: ${LEFT_MENU_WIDTH}px;
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

const Overlay = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => rgba(theme.dark1Color, 0.95)};
  z-index: 50;
`;

interface IProps {
  store?: IStore;
  router: RouterProps;
  fixedTopContent?: ReactNode;
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
      width = width - LEFT_MENU_WIDTH;
    }

    const smallWindow = width < 1000;

    if (smallWindow !== this.state.smallWindow) {
      this.props.store.leftMenuTrigger(!smallWindow);

      this.setState({ smallWindow });
    }

    const GRID_ELEMENT_WIDTH = 280;
    const GRID_PADDING_ONE = 20;
    const GRID_PADDING = GRID_PADDING_ONE * 2;

    let countOnRow = Math.floor((width - GRID_PADDING) / GRID_ELEMENT_WIDTH);

    if (countOnRow < 1) {
      countOnRow = 1;
    } else if (countOnRow > 6) {
      countOnRow = 6;
    }

    let gridWidth = countOnRow * GRID_ELEMENT_WIDTH + GRID_PADDING;

    if (gridWidth < GRID_ELEMENT_WIDTH + GRID_PADDING) {
      gridWidth = GRID_ELEMENT_WIDTH + GRID_PADDING;
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
    const { children, store, router, fixedTopContent } = this.props;

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
        <Query
          query={GET_POST_AROUND}
          fetchPolicy="network-only"
          variables={{
            id: postId,
            authorId: router.query.postAroudAuthorId,
            tagId: router.query.postAroudTagId,
            likedUserId: router.query.postAroudLikedUserId,
            sort: router.query.postAroudSort
          }}
          skip={!postId}
        >
          {({ data }) => {
            let toPrevPost;
            let toNextPost;

            const toPost = (id: string) => {
              router.push(
                {
                  pathname: router.route,
                  query: {
                    ...router.query,
                    postId: id
                  }
                },
                {
                  pathname: '/post',
                  query: { id }
                },
                {
                  shallow: true
                }
              );
            };

            if (data && data.postAround && data.postAround.prevId) {
              toPrevPost = () => toPost(data.postAround.prevId);
            }

            if (data && data.postAround && data.postAround.nextId) {
              toNextPost = () => toPost(data.postAround.nextId);
            }

            return (
              <Modal
                visible={!!postId}
                minimal
                onClose={() => {
                  router.replace(backPath);
                }}
                onLeftClick={toPrevPost}
                onRightClick={toNextPost}
              >
                <div style={{ width: '1000px' }}>
                  <PostProvider id={postId}>
                    {({ post }) => <PostView {...post} />}
                  </PostProvider>
                </div>
              </Modal>
            );
          }}
        </Query>

        <ContentBox>
          <TopNav />
          <Content>
            <ContentInsideBox>
              <Left pose={store.leftMenuIsOpen ? 'open' : 'closed'}>
                <Scrollbars autoHide universal>
                  <LeftMenu.Box>
                    <LeftMenu.Item
                      route="/"
                      equal
                      icon="home"
                      title="Главная"
                    />
                    <LeftMenu.Item
                      equal
                      route="/hot"
                      icon="fire"
                      title="В тренде"
                    />
                    <LeftMenu.Item
                      equal
                      route="/new"
                      icon="flare"
                      title="Новое"
                    />
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
                      {/* <LeftMenu.Item
                        route="/settings"
                        icon="settings"
                        title="Настройки"
                      >
                        <LeftMenu.SubItem route={`/settings`}>
                          Учетная запись
                        </LeftMenu.SubItem>
                        <LeftMenu.SubItem route={`/settings/appearance`}>
                          Внешний вид
                        </LeftMenu.SubItem>
                        <LeftMenu.SubItem route={`/settings/integrations`}>
                          Интеграции
                        </LeftMenu.SubItem>
                      </LeftMenu.Item> */}
                    </Access>
                  </LeftMenu.Box>
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
