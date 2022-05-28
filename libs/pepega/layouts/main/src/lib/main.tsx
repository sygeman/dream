import { FC, ReactNode } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import * as LeftMenu from './left-menu';
import { BaseLayout } from './base';
import { Header } from './header';
import { LogoBox } from './Logo';
import { HomeIcon } from '@heroicons/react/solid';

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
          icon={<HomeIcon className="h-4" />}
          title="Главная"
        />
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
