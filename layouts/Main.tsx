import { FC, ReactNode } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { lighten, darken, rgba } from 'polished';
import config from '../config';
import * as LeftMenu from '../ui/LeftMenu';
import BaseLayout from './Base';
import { TopStreams } from '../components/TopStreams';
import { Categories } from '../components/Nav/Left/Categories';
import { Follows } from '../components/Nav/Left/Follows';

interface IProps {
  fixedTopContent?: ReactNode;
  streams?: boolean;
}

const LogoLink = styled.a`
  display: flex;
  align-items: center;
  height: 100%;
  height: 42px;
  background: ${({ theme }) => rgba(darken(0.06, theme.main1Color), 0.9)};
  margin-bottom: 10px;
`;

const LogoImg = styled.img`
  height: 25px;
  width: 25px;
  margin-left: 18px;
  padding: 5px;
  cursor: pointer;
  background: ${({ theme }) => lighten(0.05, theme.main1Color)};
  border-radius: 5px;
`;

const LogoTitle = styled.div`
  font-size: 13px;
  margin-left: 17px;
  color: ${({ theme }) => lighten(0.4, theme.main1Color)};
  letter-spacing: 0.5px;
  font-weight: 500;
`;

const MainLayout: FC<IProps> = ({ children, fixedTopContent, streams }) => (
  <BaseLayout
    fixedTopContent={fixedTopContent}
    leftMenu={
      <LeftMenu.Box>
        <Link href="/" passHref>
          <LogoLink>
            <LogoImg src={`${config.cdnUrl}logo.svg`} />
            <LogoTitle>PepegaCom</LogoTitle>
          </LogoLink>
        </Link>
        <LeftMenu.Item route="/" equal icon="home" title="Главная" />
        <LeftMenu.Item equal route="/new" icon="flare" title="Новое" />
        <LeftMenu.Item route="/top" icon="trending-up" title="Топ" />

        <>
          <LeftMenu.Divider />
          <LeftMenu.Item route="/history" icon="time-restore" title="История" />
          <LeftMenu.Item route="/likes" icon="thumb-up" title="Понравившиеся" />
          <LeftMenu.Item route="/promoter" icon="flash" title="Продвижение" />
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
