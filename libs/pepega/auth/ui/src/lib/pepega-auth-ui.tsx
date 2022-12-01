import { FC } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { TwitchIcon } from '@dream/icons/twitch';
import { useModal } from '@dream/mono-utils-use-modal';
import { Modal } from '@dream/pepega/components/modal';

export const AuthButtonTwitch = () => {
  const { asPath } = useRouter();

  return (
    <button
      className="btn-social btn-social-twitch"
      onClick={() => signIn('twitch')}
    >
      <TwitchIcon className="text-white mr-2 h-6 opacity-90" />
      <span className="text-white opacity-80 text-xs uppercase tracking-widest mx-5 text-center w-full">
        Login with Twitch
      </span>
    </button>
  );
};

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
