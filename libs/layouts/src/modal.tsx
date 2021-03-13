import React from 'react';
import usePortal from 'react-useportal';
import { useRouter } from 'next/router';
import { XIcon } from '@dream/icons/x';

export type ModalProps = {
  onOpen?: () => void;
  onClose?: () => void;
  onLeftClick?: () => void;
  onRightClick?: () => void;
  routerKey: string;
  title?: string;
  minimal?: boolean;
  noBackgroud?: boolean;
};

export const Modal: React.FC<ModalProps> = ({
  minimal = false,
  noBackgroud = false,
  title = '',
  routerKey,
  onOpen = () => undefined,
  onClose = () => undefined,
  children,
}) => {
  const { Portal } = usePortal();
  const router = useRouter();

  if (!router || !router.query[routerKey]) {
    return null;
  }

  const closeModal = () => {
    router.back();
  };

  return (
    <Portal>
      <div className="flex fixed top-0 left-0 w-full h-full overflow-hidden">
        <div
          className="flex fixed top-0 left-0 w-full h-full bg-backgorud opacity-90"
          onClick={closeModal}
        ></div>
        <div className="m-auto z-30 bg-surface rounded overflow-hidden">
          {!minimal && (
            <div className="bg-surface-light px-4 py-2 flex items-center">
              <div className="flex flex-1 text-white">{title}</div>
              <div className="pl-2 cursor-pointer" onClick={closeModal}>
                <XIcon />
              </div>
            </div>
          )}
          <div className={!minimal ? 'p-4' : undefined}>{children}</div>
        </div>
      </div>
    </Portal>
  );
};
