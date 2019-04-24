import { FC, ReactNode } from 'react';
import { Access } from '../helpers/Access';
import CategoriesProvider from '../providers/Categories';
import FollowsProvider from '../providers/Follows';
import { Icon } from '../ui/Icon';
import * as LeftMenu from '../ui/LeftMenu';
import BaseLayout from './Base';
import useRouter from '../hooks/useRouter';

interface IProps {
  fixedTopContent?: ReactNode;
}

const MainLayout: FC<IProps> = ({ children, fixedTopContent }) => {
  const router = useRouter();

  return (
    <BaseLayout
      fixedTopContent={fixedTopContent}
      leftMenu={
        <LeftMenu.Box>
          <LeftMenu.Item route="/" equal icon="home" title="Главная" />
          <LeftMenu.Item equal route="/new" icon="flare" title="Новое" />
          <LeftMenu.Item route="/top" icon="trending-up" title="Топ">
            <LeftMenu.SubItem route="/top/day">День</LeftMenu.SubItem>
            <LeftMenu.SubItem route="/top/week">Неделя</LeftMenu.SubItem>
            <LeftMenu.SubItem route="/top/month">Месяц</LeftMenu.SubItem>
            <LeftMenu.SubItem route="/top/all">Все время</LeftMenu.SubItem>
          </LeftMenu.Item>
          <LeftMenu.Item route="/categories" icon="apps" title="Категории">
            <CategoriesProvider>
              {({ categories }) =>
                categories.map(game => (
                  <LeftMenu.SubItem
                    route={`/categories?game=${game.name}`}
                    active={router.query.game === game.name}
                    key={game.id}
                  >
                    {game.name}
                  </LeftMenu.SubItem>
                ))
              }
            </CategoriesProvider>
          </LeftMenu.Item>
          <Access>
            <LeftMenu.Item route="/follows" icon="favorite" title="Подписки">
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
                      <LeftMenu.LoadMore onClick={() => moreFollows()}>
                        <Icon type="chevron-down" />
                      </LeftMenu.LoadMore>
                    )}
                  </>
                )}
              </FollowsProvider>
            </LeftMenu.Item>
            <LeftMenu.Item
              route={`/promoter`}
              icon="n-1-square"
              title="Продвижение"
            />
          </Access>
        </LeftMenu.Box>
      }
    >
      {children}
    </BaseLayout>
  );
};

export default MainLayout;
