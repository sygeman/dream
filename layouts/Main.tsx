import { inject, observer } from 'mobx-react';
import { RouterProps, withRouter } from 'next/router';
import { lighten, rgba } from 'polished';
import { Component, ReactNode } from 'react';
import Scrollbars from 'react-custom-scrollbars';
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
import * as LeftMenu from '../ui/LeftMenu';
import { Modal } from '../ui/Modal';

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
  router: RouterProps;
  fixedTopContent?: ReactNode;
}

interface IState {
  leftMenuIsOpen: boolean;
}

@inject('store')
@observer
class MainLayout extends Component<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      leftMenuIsOpen: false
    };
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
                      route="/"
                      equal
                      icon="home"
                      title="Главная"
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
        <YMInitializer accounts={[51879323]} version="2" />
      </Box>
    );
  }
}

export default withRouter(MainLayout);
