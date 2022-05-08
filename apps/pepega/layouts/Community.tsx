import { FC, ReactNode } from 'react';
import {
  Home,
  TrendingUp,
  Restore,
  ThumbUp,
  FlashOn,
  SupervisorAccount
} from 'styled-icons/material';
import { Hot as HotIcon } from 'styled-icons/boxicons-solid/Hot';
import * as LeftMenu from '@pepega/components/LeftMenu';
import BaseLayout from './Base';
import { Categories } from '@pepega/containers/Nav/Left/Categories';
import { Follows } from '@pepega/containers/Nav/Left/Follows';
import { LogoBox } from '@pepega/containers/Nav/Left/Logo';
import { CommunityHeader } from '@pepega/containers/Community/Header';

interface IProps {
  fixedTopContent?: ReactNode;
}

const CommunityLayout: FC<IProps> = ({ children, fixedTopContent }) => (
  <BaseLayout
    fixedTopContent={<>{fixedTopContent || <CommunityHeader />}</>}
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
    {children}
  </BaseLayout>
);

export default CommunityLayout;
