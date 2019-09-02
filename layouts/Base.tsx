import { useRouter } from 'next/router';
import { lighten, rgba } from 'polished';
import { ReactNode, useState, FC } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import styled from 'styled-components';
import Auth from '../components/Auth';
import { BuyCoins } from '../components/BuyCoins';
import { CreateCommunityClip } from '../components/Community/Clip/Create';
import { CreateCommunity } from '../components/Community/Create';
import TopNav from '../components/Nav/Top';
import { PromoterHelp } from '../components/Help/Promoter';
import { Modal } from '../ui';
import { ClipModal } from '../components/Clip/ClipModal';
const LEFT_MENU_WIDTH = 240;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  position: relative;
`;

const BoxBG = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(
    ${({ theme }) => rgba(theme.dark2Color, 0.95)} 20%,
    transparent 20%
  );
  background-position: 0 0, 50px 50px;
  background-size: 30px 30px;
`;

const BoxContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => rgba(theme.dark1Color, 0.95)};
`;

const Content = styled.div`
  flex: 1;
  overflow: hidden;
  position: relative;
`;

const Left = styled.div<{ isOpen: boolean }>`
  background: ${({ theme }) => lighten(0.03, theme.dark1Color)};
  width: ${LEFT_MENU_WIDTH}px;
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  z-index: 100;
  transition: 0.3s;

  @media (max-width: 700px) {
    left: ${({ isOpen }) => (isOpen ? 0 : -LEFT_MENU_WIDTH)}px;
  }
`;

const PostsBox = styled.div<{ noLeftMenu?: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-left: 0;
  transition: 0.3s;

  @media (min-width: 700px) {
    padding-left: ${({ noLeftMenu }) => (noLeftMenu ? 0 : LEFT_MENU_WIDTH)}px;
  }
`;

const ContentBox = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
`;

const ContentInsideBox = styled.div`
  height: 100%;
  display: flex;
`;

const Overlay = styled.div<{ leftMenuIsOpen: boolean }>`
  display: none;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => rgba(theme.dark1Color, 0.95)};
  z-index: 50;

  @media (max-width: 700px) {
    ${({ leftMenuIsOpen }) => leftMenuIsOpen && 'display: block;'}
  }
`;

interface IProps {
  fixedTopContent?: ReactNode;
  leftMenu?: ReactNode;
}

const BaseLayout: FC<IProps> = ({ children, fixedTopContent, leftMenu }) => {
  const router = useRouter();

  if (!router) {
    return null;
  }

  const [leftMenuIsOpen, setLeftMenuIsOpen] = useState(false);

  let clipId = null;
  let backPath = null;

  if (typeof router.query.clipId === 'string') {
    clipId = router.query.clipId;
  }

  if (typeof router.query.backPath === 'string') {
    backPath = router.query.backPath;
  }

  return (
    <Box>
      <BoxBG></BoxBG>
      <BoxContent>
        <Modal
          visible={!!clipId}
          minimal
          onClose={() => router.replace(backPath)}
        >
          <ClipModal clipId={clipId} />
        </Modal>

        <Modal
          title="Купить PepeCoin"
          visible={router.query.buyCoinsModal === '1'}
          onClose={() => router.back()}
        >
          <BuyCoins />
        </Modal>

        <Modal
          minimal
          visible={router.query.authModal === '1'}
          onClose={() => router.back()}
        >
          <Auth />
        </Modal>
        <Modal
          title="Предложить клип сообществу"
          visible={router.query.newClip === '1'}
          onClose={() => router.back()}
        >
          <CreateCommunityClip />
        </Modal>
        <Modal
          title="Новое сообщество"
          visible={router.query.newCommunity === '1'}
          onClose={() => router.back()}
        >
          <CreateCommunity />
        </Modal>

        <Modal
          minimal
          title="Как работает продвижение"
          visible={router.query.howToPromoter === '1'}
          onClose={() => router.back()}
        >
          <PromoterHelp />
        </Modal>

        <ContentBox>
          <Content>
            <ContentInsideBox>
              {leftMenu && (
                <Left isOpen={leftMenuIsOpen}>
                  <Scrollbars autoHide universal>
                    {leftMenu}
                  </Scrollbars>
                </Left>
              )}
              <PostsBox id="layoutContent" noLeftMenu={!leftMenu}>
                <TopNav
                  leftMenuTrigger={() => setLeftMenuIsOpen(!leftMenuIsOpen)}
                />
                {fixedTopContent}
                <Scrollbars
                  autoHide
                  universal
                  renderView={props => <div {...props} id="mainScroll" />}
                >
                  {children}
                </Scrollbars>
              </PostsBox>
            </ContentInsideBox>
            <Overlay
              leftMenuIsOpen={leftMenuIsOpen}
              onClick={() => setLeftMenuIsOpen(false)}
            />
          </Content>
        </ContentBox>
      </BoxContent>
    </Box>
  );
};

export default BaseLayout;
