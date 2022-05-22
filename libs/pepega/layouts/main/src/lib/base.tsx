import { useRouter } from 'next/router';
import { lighten, rgba } from 'polished';
import { ReactNode, useState, FC } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import styled from 'styled-components';
import { Auth } from '@dream/pepega/containers-old';
import { Modal } from '@dream/pepega/components-old';
import { CreateCommunityClip } from '@dream/pepega/containers-old';
import { ClipModal } from '@dream/pepega/containers-old';
import { UserBox, TopNav } from '@dream/pepega/containers-old';

const LEFT_MENU_WIDTH = 240;

const Left = styled.div<{ isOpen: boolean }>`
  background: ${({ theme }) => lighten(0.03, theme.colors.background)};
  width: ${LEFT_MENU_WIDTH}px;
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  z-index: 100;
  transition: 0.3s;
  display: flex;
  flex-direction: column;

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

const Overlay = styled.div<{ leftMenuIsOpen: boolean }>`
  display: none;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => rgba(theme.colors.background, 0.95)};
  z-index: 50;

  @media (max-width: 700px) {
    ${({ leftMenuIsOpen }) => leftMenuIsOpen && 'display: block;'}
  }
`;

interface IProps {
  fixedTopContent?: ReactNode;
  leftMenu?: ReactNode;
  children?: React.ReactNode;
}

export const BaseLayout: FC<IProps> = ({
  children,
  fixedTopContent,
  leftMenu,
}) => {
  const router = useRouter();
  const [leftMenuIsOpen, setLeftMenuIsOpen] = useState(false);

  if (!router) {
    return null;
  }

  let clipId = '';
  let backPath = '';

  if (typeof router.query.clipId === 'string') {
    clipId = router.query.clipId;
  }

  if (typeof router.query.backPath === 'string') {
    backPath = router.query.backPath;
  }

  return (
    <div className="flex flex-col h-full overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full" />
      <div className="absolute top-0 left-0 w-full h-full bg-background/95">
        <Modal
          visible={!!clipId}
          minimal
          onClose={() => router.replace(backPath)}
        >
          <ClipModal clipId={clipId} />
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

        <div className="relative w-full h-full overflow-hidden flex flex-col">
          <div className="flex-1 overflow-hidden relative">
            <div className="h-full flex">
              {leftMenu && (
                <Left isOpen={leftMenuIsOpen}>
                  <div className="flex flex-1">
                    <Scrollbars autoHide universal>
                      {leftMenu}
                    </Scrollbars>
                  </div>
                  <UserBox />
                </Left>
              )}
              <PostsBox id="layoutContent" noLeftMenu={!leftMenu}>
                <TopNav
                  leftMenuTrigger={() => setLeftMenuIsOpen(!leftMenuIsOpen)}
                >
                  {fixedTopContent}
                </TopNav>
                {children}
              </PostsBox>
            </div>
            <Overlay
              leftMenuIsOpen={leftMenuIsOpen}
              onClick={() => setLeftMenuIsOpen(false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
