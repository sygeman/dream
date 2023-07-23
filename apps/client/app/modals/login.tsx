'use client';
import clsx from 'clsx';
import { signIn } from 'next-auth/react';
import { Modal } from '../../components/modal';
import { useModal } from '../../helpers/use-modal';

type Props = {
  provider: string;
  className: string;
};

export const SocialButton = ({ provider, className }: Props) => (
  <button
    onClick={() => signIn(provider)}
    className={clsx('btn-social w-full', className)}
  >
    <span className="text-white opacity-80 text-xs uppercase tracking-widest mx-5 text-center w-full">
      Login with {provider}
    </span>
  </button>
);

export const LoginModal = () => {
  const modalProps = useModal();

  return (
    <Modal id="authModal" minimal {...modalProps}>
      <div className="flex flex-col px-4 py-2">
        <SocialButton className="btn-social-twitch" provider="twitch" />
        <SocialButton className="btn-social-spotify" provider="spotify" />
      </div>
    </Modal>
  );
};
