import gql from 'graphql-tag';
import Link from 'next/link';
import { RouterProps, withRouter } from 'next/router';
import { darken, lighten } from 'polished';
import { Component, FC } from 'react';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import { Icon } from '../../../ui/Icon';
import Access from '../../Access';

const GET_USER_TWITCH_FOLLOWS = gql`
  query userTwitchFollows($limit: Int, $offset: Int) {
    userTwitchFollows(offset: $offset, limit: $limit) {
      count
      follows {
        title
        name
      }
    }
  }
`;

const GET_TWITCH_TOP_GAMES = gql`
  query twitchTopGames {
    twitchTopGames {
      channels
      viewers
      game {
        _id
        name
        popularity
        giantbomb_id
        box {
          large
          medium
          small
        }
        logo {
          large
          medium
          small
        }
      }
    }
  }
`;

const Box = styled.div`
  padding: 10px 0;
`;

const Item = styled.a`
  font-size: 14px;
  position: relative;
  height: 38px;
  display: flex;
  align-items: center;
  cursor: pointer;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  background: ${({ active, theme }) =>
    active && lighten(0.05, theme.dark2Color)};

  :hover {
    background: ${({ theme }) => lighten(0.05, theme.dark2Color)};
  }

  i {
    height: 100%;
    width: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    left: 20px;
    font-size: 19px;
    color: ${({ theme }) => theme.accent2Color};
  }
`;

const Channels = styled.div``;

const SubItemMenuBox = styled.div`
  /* padding: 6px 0; */
`;

const SubItem = styled('a')<{
  active?: boolean;
}>`
  padding: 0 20px 0 70px;
  height: 32px;
  display: flex;
  align-items: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 14px;
  cursor: pointer;
  color: ${({ theme }) => darken(0.3, theme.text1Color)};
  background: ${({ theme, active }) =>
    active ? lighten(0.025, theme.dark2Color) : 'transparent'};

  :hover {
    background: ${({ theme }) => lighten(0.025, theme.dark2Color)};
  }

  span {
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

const LoadMoreChannels = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  font-size: 13px;
  color: ${({ theme }) => theme.accent2Color};
  background: ${({ theme }) => lighten(0.03, theme.dark2Color)};
  cursor: pointer;

  :hover {
    background: ${({ theme }) => lighten(0.05, theme.dark2Color)};
  }

  i {
    font-size: 18px;
  }
`;

interface IMenuItem {
  route: string;
}

const SubItemMenu = withRouter(({ router, route, active, children }) => (
  <Link href={route} shallow passHref>
    <SubItem active={active || router.route === route}>
      <span>{children}</span>
    </SubItem>
  </Link>
));

const MenuItem: FC<IMenuItem> = withRouter(
  ({ router, route, title, icon, children, equal }) => {
    const active = equal
      ? router.route === route
      : router.route.search(`${route}`) >= 0;

    return (
      <>
        <Link href={route} shallow passHref>
          <Item active={active}>
            <Icon type={icon} /> {title}
          </Item>
        </Link>
        {active && <SubItemMenuBox>{children}</SubItemMenuBox>}
      </>
    );
  }
);

class LeftMenu extends Component {
  public page: number;
  public pageSize: number;

  constructor(props) {
    super(props);

    this.page = 0;
    this.pageSize = 20;
  }

  public render() {
    const { router } = this.props;

    return (
      <Box>
        <MenuItem route="/" equal icon="home" title="Главная" />
        <MenuItem route="/hot" icon="fire" title="В тренде" />
        <MenuItem route="/new" icon="flare" title="Новое" />
        <MenuItem route="/top" icon="trending-up" title="Топ">
          <SubItemMenu route="/top/day">День</SubItemMenu>
          <SubItemMenu route="/top/week">Неделя</SubItemMenu>
          <SubItemMenu route="/top/month">Месяц</SubItemMenu>
          <SubItemMenu route="/top/all">Все время</SubItemMenu>
        </MenuItem>
        <MenuItem route="/categories" icon="apps" title="Категории">
          <Query query={GET_TWITCH_TOP_GAMES}>
            {({ loading, error, data, fetchMore }) => {
              if (loading) {
                return null;
              }

              if (error || !data || !data.twitchTopGames) {
                return null;
              }

              return (
                <>
                  <Channels>
                    {data.twitchTopGames.map(({ game }) => (
                      <SubItemMenu
                        route={`/categories?game=${game.name}`}
                        active={router.query.game === game.name}
                        key={game._id}
                      >
                        {game.name}
                      </SubItemMenu>
                    ))}
                  </Channels>
                </>
              );
            }}
          </Query>
        </MenuItem>
        <Access>
          <MenuItem route="/likes" icon="thumb-up" title="Понравившиеся" />
          <MenuItem route="/follows" icon="favorite" title="Подписки">
            <Query
              query={GET_USER_TWITCH_FOLLOWS}
              variables={{
                limit: this.pageSize,
                offset: 0
              }}
            >
              {({ loading, error, data, fetchMore }) => {
                if (loading) {
                  return null;
                }

                if (error || !data || !data.userTwitchFollows) {
                  return null;
                }

                this.page++;

                return (
                  <>
                    <Channels>
                      {data.userTwitchFollows.follows.map(channel => (
                        <SubItemMenu
                          route={`/follows?channel=${channel.name}`}
                          active={router.query.channel === channel.name}
                          key={channel.name}
                        >
                          {channel.title}
                        </SubItemMenu>
                      ))}
                      {this.page * this.pageSize <=
                        data.userTwitchFollows.count && (
                        <LoadMoreChannels
                          onClick={() => {
                            fetchMore({
                              variables: {
                                offset: this.page * this.pageSize
                              },
                              updateQuery: (prev, { fetchMoreResult }) => {
                                if (!fetchMoreResult) {
                                  return prev;
                                }

                                this.page++;

                                return {
                                  ...prev,
                                  userTwitchFollows: {
                                    ...prev.userTwitchFollows,
                                    follows: [
                                      ...prev.userTwitchFollows.follows,
                                      ...fetchMoreResult.userTwitchFollows
                                        .follows
                                    ]
                                  }
                                };
                              }
                            });
                          }}
                        >
                          <Icon type="chevron-down" />
                        </LoadMoreChannels>
                      )}
                    </Channels>
                  </>
                );
              }}
            </Query>
          </MenuItem>
        </Access>
      </Box>
    );
  }
}

export default withRouter(LeftMenu);
