import React from "react";

import { Modal } from "@/components/modal";
import { useModal } from "@/helpers/use-modal";

import { ChannelYoutubeModeAddVideo } from "./add-video";

export const YoutubeModeAddVideoModal = () => {
  const modalProperties = useModal();

  return (
    <Modal
      id="waitlistYoutubeAddVideo"
      title="Add Video To Queue"
      minimal
      {...modalProperties}
    >
      <ChannelYoutubeModeAddVideo />
    </Modal>
  );
};
