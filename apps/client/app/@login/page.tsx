'use client';
import { Modal } from 'apps/client/components/modal';
import { useModal } from 'apps/client/helpers/use-modal';
import { SocialButton } from './social-button';

const LoginModal = () => {
  const modalProps = useModal();

  return (
    <Modal id="authModal" minimal {...modalProps}>
      <div className="flex flex-col px-4 py-2">
        <SocialButton className="btn-social-twitch" provider="twitch" />
        {/* <SocialButton className="btn-social-spotify" provider="spotify" /> */}
      </div>
    </Modal>
  );
};

export default LoginModal;
