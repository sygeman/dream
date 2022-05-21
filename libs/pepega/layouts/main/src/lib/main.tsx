import { FC, ReactNode } from 'react';
import { Home, TrendingUp, Restore, ThumbUp } from 'styled-icons/material';
import Scrollbars from 'react-custom-scrollbars';
import { Hot as HotIcon } from 'styled-icons/boxicons-solid/Hot';
import { LeftMenu } from '@dream/pepega/components-old';
import { BaseLayout } from './base';
import { Header } from './header';
import { Categories, Follows, LogoBox } from '@dream/pepega/containers-old';

interface IProps {
  fixedTopContent?: ReactNode;
  streams?: boolean;
  children?: React.ReactNode;
}

export const MainLayout: FC<IProps> = ({
  children,
  fixedTopContent,
  streams,
}) => (
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
      {children}
    </Scrollbars>
  </BaseLayout>
);
