"use client";
import { Modal } from "@/components/modal";
import { useModal } from "@/helpers/use-modal";
import { SocialButton } from "./social-button";

export const LoginModal = () => {
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
