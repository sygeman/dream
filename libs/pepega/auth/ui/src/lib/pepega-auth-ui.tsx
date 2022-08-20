import { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { TwitchIcon } from '@dream/icons/twitch';
import { useModal } from '@dream/mono-utils-use-modal';
import { Modal } from '@dream/pepega/components/modal';

export const AuthButtonTwitch = () => {
  const { asPath } = useRouter();

  return (
    <Link
      href={`/api/auth/twitch?continue=${asPath.replace('authModal=1', '')}`}
    >
      <button className="btn-social btn-social-twitch">
        <TwitchIcon className="text-white mr-2 h-6 opacity-90" />
        <span className="text-white opacity-80 text-xs uppercase tracking-widest mx-5 text-center w-full">
          Login with Twitch
        </span>
      </button>
    </Link>
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
