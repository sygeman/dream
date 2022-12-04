import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { useModal } from '../../utils/use-modal';
import { Modal } from '../modal';

export const AuthModal = () => {
  const modalProps = useModal();

  return (
    <Modal id="authModal" {...modalProps}>
      <div className="flex flex-col py-5 px-10 w-[500px]">
        <div className="flex flex-col px-4 py-2">
          <button
            className="btn-social btn-social-twitch"
            onClick={() => signIn('twitch')}
          >
            <Image
              alt=""
              src="/twitch.svg"
              width={24}
              height={24}
              className="mr-2 h-6 opacity-90"
            />
            <span className="text-white opacity-80 text-xs uppercase tracking-widest mx-5 text-center w-full">
              Login with Twitch
            </span>
          </button>
        </div>
      </div>
    </Modal>
  );
};
