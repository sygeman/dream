import { FC, ReactNode } from 'react';
import { Access } from '../helpers/Access';
import CategoriesProvider from '../providers/Categories';
import FollowsProvider from '../providers/Follows';
import { Icon } from '../ui';
import * as LeftMenu from '../ui/LeftMenu';
import BaseLayout from './Base';
import useRouter from '../hooks/useRouter';
import { TopStreams } from '../components/TopStreams';

interface IProps {
  fixedTopContent?: ReactNode;
  streams?: boolean;
}

const MainLayout: FC<IProps> = ({ children, fixedTopContent, streams }) => {
  const router = useRouter();

  return (
    <BaseLayout
      fixedTopContent={fixedTopContent}
      leftMenu={
        <LeftMenu.Box>
          <LeftMenu.Item route="/" equal icon="home" title="Главная" />
          <LeftMenu.Item equal route="/new" icon="flare" title="Новое" />
          <LeftMenu.Item route="/top" icon="trending-up" title="Топ" />
          <Access>
            <LeftMenu.Item route="/game" icon="apps" title="Категории">
              <CategoriesProvider>
                {({ categories }) =>
                  categories.map(game => (
                    <LeftMenu.SubItem
                      route={`/game?id=${game.id}`}
                      active={
                        router.route === '/game' && router.query.id === game.id
                      }
                      key={game.id}
                    >
                      {game.name}
                    </LeftMenu.SubItem>
                  ))
                }
              </CategoriesProvider>
            </LeftMenu.Item>

            <FollowsProvider>
              {({
                follows,
                total,
                moreFollows,
                hasMore,
                hasLess,
                loading,
                refetch
              }) => (
                <LeftMenu.Item
                  route="/channel"
                  icon="favorite"
                  title="Подписки"
                  badge={total}
                  noClick
                  showContentAlways
                >
                  {follows.map(channel => (
                    <LeftMenu.SubItem
                      route={`/channel?id=${channel.to_id}`}
                      active={
                        router.route === '/channel' &&
                        router.query.id === channel.to_id
                      }
                      key={channel.to_id}
                    >
                      {channel.to_name}
                    </LeftMenu.SubItem>
                  ))}
                  {hasMore && (
                    <LeftMenu.LoadMore onClick={() => moreFollows()}>
                      {loading ? 'Загрузка...' : <Icon type="chevron-down" />}
                    </LeftMenu.LoadMore>
                  )}
                  {hasLess && (
                    <LeftMenu.LoadMore onClick={() => refetch()}>
                      <Icon type="chevron-up" />
                    </LeftMenu.LoadMore>
                  )}
                </LeftMenu.Item>
              )}
            </FollowsProvider>
          </Access>
        </LeftMenu.Box>
      }
    >
      <>
        {streams && <TopStreams />}
        {children}
      </>
    </BaseLayout>
  );
};

export default MainLayout;
