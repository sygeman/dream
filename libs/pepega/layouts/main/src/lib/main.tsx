import { FC, ReactNode } from 'react';
import { Home } from 'styled-icons/material';
import Scrollbars from 'react-custom-scrollbars';
import { LeftMenu } from '@dream/pepega/components-old';
import { BaseLayout } from './base';
import { Header } from './header';
import { LogoBox } from './Logo';

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
