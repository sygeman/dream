import { FC, ReactNode } from 'react';
import {
  Home,
  TrendingUp,
  Restore,
  ThumbUp,
  FlashOn,
  SupervisorAccount,
} from 'styled-icons/material';
import Scrollbars from 'react-custom-scrollbars';
import { Hot as HotIcon } from 'styled-icons/boxicons-solid/Hot';
import * as LeftMenu from '@pepega/pepega-ui/LeftMenu';
import BaseLayout from './Base';
import { TopStreams } from '../containers/TopStreams';
import { Categories } from '../containers/Nav/Left/Categories';
import { Follows } from '../containers/Nav/Left/Follows';
import { LogoBox } from '../containers/Nav/Left/Logo';
import { Header } from '../containers/Header';

interface IProps {
  fixedTopContent?: ReactNode;
  streams?: boolean;
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
        <LeftMenu.Item
          route="/communities"
          icon={<SupervisorAccount size="18px" />}
          title="Сообщества"
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
          <LeftMenu.Item
            route="/promoter"
            icon={<FlashOn size="18px" />}
            title="Продвижение"
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
      <>
        {streams && <TopStreams max={6} live={2} />}
        {children}
      </>
    </Scrollbars>
  </BaseLayout>
);

export default MainLayout;
