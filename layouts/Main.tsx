import { FC, ReactNode } from 'react';
import * as LeftMenu from '../ui/LeftMenu';
import BaseLayout from './Base';
import { TopStreams } from '../components/TopStreams';
import { Categories } from '../components/Nav/Left/Categories';
import { Follows } from '../components/Nav/Left/Follows';

interface IProps {
  fixedTopContent?: ReactNode;
  streams?: boolean;
}

const MainLayout: FC<IProps> = ({ children, fixedTopContent, streams }) => (
  <BaseLayout
    fixedTopContent={fixedTopContent}
    leftMenu={
      <LeftMenu.Box>
        <LeftMenu.Item route="/" equal icon="home" title="Главная" />
        <LeftMenu.Item equal route="/new" icon="flare" title="Новое" />
        <LeftMenu.Item route="/top" icon="trending-up" title="Топ" />

        <>
          <LeftMenu.Divider />
          <LeftMenu.Item route="/history" icon="time-restore" title="История" />
          <LeftMenu.Item route="/likes" icon="thumb-up" title="Понравившиеся" />
          <LeftMenu.Divider />

          <Categories />
          <LeftMenu.Divider />

          <Follows />
        </>
      </LeftMenu.Box>
    }
  >
    <>
      {streams && <TopStreams />}
      {children}
    </>
  </BaseLayout>
);

export default MainLayout;
