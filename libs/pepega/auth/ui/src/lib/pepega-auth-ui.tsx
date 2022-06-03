import { FC } from 'react';
import { AuthButtonTwitch } from '@dream/mono-auth-ui';
import { useModal } from '@dream/mono-utils-use-modal';
import { Modal } from '@dream/pepega/components/modal';

export const AuthModal: FC = () => {
  const modalProps = useModal();

  return (
    <Modal id="authModal" {...modalProps}>
      <div className="flex flex-col py-5 px-10 w-[500px]">
        <div className="flex flex-col px-4 py-2">
          <AuthButtonTwitch />
        </div>
      </div>
    </Modal>
  );
};
