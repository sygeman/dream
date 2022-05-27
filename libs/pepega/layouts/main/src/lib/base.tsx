import { useRouter } from 'next/router';
import { lighten } from 'polished';
import clsx from 'clsx';
import { ReactNode, useState, FC } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { Auth } from '@dream/pepega/auth/ui';
import { Modal } from '@dream/pepega/components-old';
import { CreateClip } from '@dream/pepega/clip/ui';
import { ClipModal } from '@dream/pepega/clip/ui';
import { UserBox } from './User';

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
          title="Предложить клип"
          visible={router.query.newClip === '1'}
          onClose={() => router.back()}
        >
          <CreateClip />
        </Modal>

        <div className="relative w-full h-full overflow-hidden flex flex-col">
          <div className="flex-1 overflow-hidden relative">
            <div className="h-full flex">
              {leftMenu && (
                <div
                  className={clsx(
                    'w-[240px] flex flex-col absolute top-0 h-full z-[100] transition-all delay-150',
                    leftMenuIsOpen ? 'left-0' : 'left-[-240px] sm:left-0'
                  )}
                  style={{ backgroundColor: lighten(0.03, '#1D1E31') }}
                >
                  <div className="flex flex-1">
                    <Scrollbars autoHide universal>
                      {leftMenu}
                    </Scrollbars>
                  </div>
                  <UserBox />
                </div>
              )}
              <div
                id="layoutContent"
                className={clsx(
                  'flex flex-col w-full transition-all delay-150',
                  leftMenu && 'sm:pl-[240px]'
                )}
              >
                {children}
              </div>
            </div>
            <div
              className={clsx(
                'absolute left-0 top-0 w-full h-full z-50 bg-background/95 transition-all delay-150',
                leftMenuIsOpen ? 'sm:hidden' : 'hidden'
              )}
              onClick={() => setLeftMenuIsOpen(false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
