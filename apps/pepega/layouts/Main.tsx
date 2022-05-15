import { FC, ReactNode } from 'react';
import { Home, TrendingUp, Restore, ThumbUp } from 'styled-icons/material';
import Scrollbars from 'react-custom-scrollbars';
import { Hot as HotIcon } from 'styled-icons/boxicons-solid/Hot';
import * as LeftMenu from '../components/LeftMenu';
import BaseLayout from './Base';
import { Categories } from '../containers/Nav/Left/Categories';
import { Follows } from '../containers/Nav/Left/Follows';
import { LogoBox } from '../containers/Nav/Left/Logo';
import { Header } from '../containers/Header';

interface IProps {
  fixedTopContent?: ReactNode;
  streams?: boolean;
  children?: React.ReactNode;
}

const MainLayout: FC<IProps> = ({ children, fixedTopContent, streams }) => (
  <BaseLayout
    fixedTopContent={<>{fixedTopContent || <Header />}</>}
    leftMenu={
      <LeftMenu.Box>
        <LogoBox />
        <LeftMenu.Item
          route="/"
          equal
          icon={<Home size="18px" />}
          title="Главная"
        />
        <LeftMenu.Item
          equal
          route="/new"
          icon={<HotIcon size="16px" />}
          title="Новое"
        />
        <LeftMenu.Item
          route="/top"
          icon={<TrendingUp size="18px" />}
          title="Топ"
        />

        <>
          <LeftMenu.Divider />
          <LeftMenu.Item
            route="/history"
            icon={<Restore size="18px" />}
            title="История"
          />
          <LeftMenu.Item
            route="/likes"
            icon={<ThumbUp size="18px" />}
            title="Понравившиеся"
          />
          <LeftMenu.Divider />

          <Categories />
          <LeftMenu.Divider />

          <Follows />
        </>
      </LeftMenu.Box>
    }
  >
    <Scrollbars
      autoHide
      universal
      renderView={(props) => <div {...props} id="mainScroll" />}
    >
      <>{children}</>
    </Scrollbars>
  </BaseLayout>
);

export default MainLayout;
